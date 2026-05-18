import axios from "axios";
import logger from "logger";

import { MAX_INVENTORIES } from "shared/config/vehicle-inventory-config";
import type {
  VehicleInventory,
  VehicleInventorySearchQuery,
  VehicleInventorySearchResponse,
} from "shared/types/vehicle-inventory-lookup-types";
import { VehicleInventoryService } from "shared/types/vehicle-inventory-lookup-types";

const TOYOTA_WAF_TOKEN_TTL_MS = 90 * 60 * 1000;
let cachedToyotaWafToken: string | null = null;
let toyotaWafTokenExpiresAt = 0;

async function getToyotaWafToken(): Promise<string | null> {
  if (cachedToyotaWafToken && Date.now() < toyotaWafTokenExpiresAt) {
    return cachedToyotaWafToken;
  }
  try {
    logger.info("Refreshing Toyota WAF token via headless browser");
    cachedToyotaWafToken = await fetchToyotaWafTokenViaPlaywright();
    toyotaWafTokenExpiresAt = Date.now() + TOYOTA_WAF_TOKEN_TTL_MS;
    logger.info("Toyota WAF token refreshed successfully");
    return cachedToyotaWafToken;
  } catch (error) {
    logger.error(`Failed to obtain Toyota WAF token: ${(error as Error).message}`);
    return null;
  }
}

async function fetchToyotaWafTokenViaPlaywright(): Promise<string> {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0",
    });
    const page = await context.newPage();

    // toyota.com/search-inventory auto-fires a GraphQL query on load.
    // Intercept it to read the x-aws-waf-token header the page JS injects,
    // then abort — we only need the token, not the response.
    let capturedToken: string | null = null;
    await page.route("**/api.search-inventory.toyota.com/graphql**", async (route) => {
      if (!capturedToken) {
        capturedToken = route.request().headers()["x-aws-waf-token"] ?? null;
      }
      await route.abort();
    });

    await page.goto("https://www.toyota.com/search-inventory", {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    if (capturedToken) {
      return capturedToken;
    }

    // Fallback: the WAF JS challenge stores its proof in an aws-waf-token cookie on
    // api.search-inventory.toyota.com; the page JS copies it into the request header.
    const cookies = await context.cookies("https://api.search-inventory.toyota.com");
    const wafCookie = cookies.find((c) => c.name === "aws-waf-token");
    if (wafCookie?.value) {
      return wafCookie.value;
    }

    throw new Error(
      "WAF token not found in intercepted requests or cookies — toyota.com may have changed its load behaviour"
    );
  } finally {
    await browser.close();
  }
}

type HondaVehicleDealer = {
  DealerNumber: string;
  Name: string;
  DrivingDistanceMiles: number;
};

type HondaVehicleInventory = {
  DealerNumber: string;
  ModelYear: string;
  ModelGroupName: string;
  ModelTrim: string;
  Transmission: string;
  VINs: Array<{
    VIN: string;
    Accessories: Array<any>;
    OnlineRetailingPreferredVIN: string | null;
    VehicleDetailPageURL: string | null;
  }>;
  ExteriorColor: string;
  InteriorColor: string;
  NumberOnSite: number;
};

export class HondaVehicleInventoryService extends VehicleInventoryService {
  async searchAsync({
    year,
    model,
    zipCode,
    maxDealers,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
    const { data } = await axios.get<{
      dealers: Array<HondaVehicleDealer>;
      inventory: Array<HondaVehicleInventory>;
    }>("https://automobiles.honda.com/platform/api/v3/inventoryAndDealers", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "sec-ch-ua-platform": "Windows",
        "sec-ch-ua":
          '"Chromium";v="140", "Not=A?Brand";v="24", "Microsoft Edge";v="140"',
        "sec-ch-ua-mobile": "?0",
      },
      params: {
        productDivisionCode: "A",
        modelYear: year,
        modelGroup: model,
        zipCode,
        maxDealers,
      },
    });

    const dealerLookup: { [key: string]: HondaVehicleDealer } = (
      data.dealers || []
    ).reduce((result, dealer) => {
      const dealerNumber = dealer.DealerNumber;
      if (dealerNumber == null || dealer == null) {
        return result;
      }
      return {
        ...result,
        [dealerNumber]: dealer,
      };
    }, {});

    return {
      vehicles: data.inventory
        ?.slice(0, MAX_INVENTORIES)
        .map(
          ({
            DealerNumber,
            ModelYear,
            ModelGroupName,
            ModelTrim,
            Transmission,
            VINs,
            ExteriorColor,
            InteriorColor,
            NumberOnSite,
          }) => ({
            vin: VINs[0].VIN,
            dealer: dealerLookup[DealerNumber].Name,
            drivingDistance: dealerLookup[DealerNumber].DrivingDistanceMiles,
            year: Number.parseInt(ModelYear),
            model: ModelGroupName,
            trim: ModelTrim,
            transmission: Transmission,
            exteriorColor: ExteriorColor,
            interiorColor: InteriorColor,
            numAvailable: NumberOnSite,
          })
        ),
    };
  }
}

type ToyotaVehicleInventory = {
  vin: string;
  marketingSeries: string;
  year: number;
  dealerMarketingName: string;
  distance: number;
  model: {
    marketingName: string;
  };
  transmission: {
    transmissionType: string;
  };
  intColor: {
    marketingName: string;
  };
  extColor: {
    marketingName: string;
  };
};

export class ToyotaVehicleInventoryService extends VehicleInventoryService {
  async searchAsync({
    year,
    model,
    zipCode,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
    const wafToken = await getToyotaWafToken();

    const { data } = await axios.post<{
      data: {
        locateVehiclesByZip: {
          vehicleSummary: Array<ToyotaVehicleInventory>;
        };
      };
    }>(
      "https://api.search-inventory.toyota.com/graphql",
      {
        query: `
          query searchInventory($zip: String!, $model: String!) {
            locateVehiclesByZip(
              zipCode: $zip
              brand: "TOYOTA"
              pageNo: 1
              pageSize: 500
              seriesCodes: $model
              distance: 50
            ) {
              vehicleSummary {
                vin
                marketingSeries
                year
                dealerMarketingName
                distance
                model {
                  marketingName
                }
                transmission {
                  transmissionType
                }
                intColor {
                  marketingName
                }
                extColor {
                  marketingName
                }
              }
            }
          }`,
        variables: {
          zip: zipCode?.toString(),
          model,
        },
      },
      {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
          origin: "https://www.toyota.com",
          referer: "https://www.toyota.com/",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-ch-ua": '"Chromium";v="148", "Microsoft Edge";v="148", "Not/A)Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0",
          "x-api-key": "undefined",
          ...(wafToken ? { "x-aws-waf-token": wafToken } : {}),
        },
      }
    );

    if (!data?.data?.locateVehiclesByZip) {
      throw new Error(
        "Toyota inventory API blocked by WAF — refresh TOYOTA_WAF_TOKEN env variable from browser DevTools on toyota.com"
      );
    }

    logger.info(
      `${
        data.data?.locateVehiclesByZip?.vehicleSummary?.length ?? 0
      } vehicles found from Toyota inventory`
    );
    return {
      vehicles:
        data.data?.locateVehiclesByZip?.vehicleSummary.map(
          ({
            vin,
            marketingSeries,
            year,
            dealerMarketingName,
            distance,
            model: { marketingName: modelFullName },
            transmission: { transmissionType },
            intColor: { marketingName: intColor },
            extColor: { marketingName: extColor },
          }) => ({
            vin,
            dealer: dealerMarketingName,
            drivingDistance: distance,
            year,
            model: marketingSeries,
            trim: modelFullName.substring(marketingSeries.length + 1),
            transmission: transmissionType,
            exteriorColor: extColor,
            interiorColor: intColor,
            numAvailable: 1,
          })
        ) ?? [],
    };
  }
}

type SubaruDealerItem = {
  dealer: {
    id: string;
    name: string;
    siteUrl: string;
  };
  distance: number;
};

type SubaruVehicleInventory = {
  drivetrain: string;
  ext_color: string;
  int_color: string;
  model: string;
  trim: string;
  vin: string;
  year: string;
};

type SubaruVehicleInventoryInternal = {
  Dealership: string;
  Model: string;
  Transmission: string;
  Trim: string;
  Vin: string;
  Year: number;
};

type SubaruVehicleInventoryQueryParams = {
  hitsPerPage: number;
  facetFilters: string[][];
};

export class SubaruVehicleInventoryService extends VehicleInventoryService {
  async searchAsync({
    year,
    model,
    zipCode,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
    const { data: dealers } = await axios.get<Array<SubaruDealerItem>>(
      "https://www.subaru.com/services/dealers/distances/by/zipcode",
      {
        params: {
          zipcode: zipCode,
          count: 20,
          type: "Active",
        },
      }
    );

    const queryParams: SubaruVehicleInventoryQueryParams = {
      hitsPerPage: 100,
      facetFilters: [
        ["type:New"],
        ["make:Subaru"],
        [`model:${model?.toUpperCase()}`],
      ],
    };
    const encodedQueryParams = `hitsPerPage=${
      queryParams.hitsPerPage
    }&facetFilters=${encodeURIComponent(
      JSON.stringify(queryParams.facetFilters)
    )}`;

    const inventoryPromises = dealers.map(
      ({ dealer: { name: dealerName, siteUrl }, distance }) =>
        new Promise<Array<VehicleInventory>>((resolve) => {
          const { hostname } = new URL(siteUrl);
          const dealerDomainName = hostname.replace("www.", "").split(".")[0];
          // This may not work for every dealer, as not all the dealers use the same API for fetching inventory
          const indexName = `${dealerDomainName}_production_inventory`;

          axios
            .post<{
              results: Array<{
                hits: Array<SubaruVehicleInventory>;
              }>;
            }>(
              "https://10aprxotjr-dsn.algolia.net/1/indexes/*/queries",
              {
                requests: [
                  {
                    indexName,
                    params: encodedQueryParams,
                  },
                ],
              },
              {
                params: {
                  "x-algolia-agent":
                    "Algolia%20for%20JavaScript%20(4.9.1)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.4.4)",
                  "x-algolia-api-key": "003c8cddb5b15f2cfa774c02b7a3b59e",
                  "x-algolia-application-id": "10APRXOTJR",
                },
              }
            )
            .then(({ data }) => {
              const hits = data.results[0].hits;
              resolve(
                hits.map(
                  ({
                    drivetrain,
                    ext_color,
                    int_color,
                    model,
                    trim,
                    vin,
                    year,
                  }) => ({
                    vin,
                    dealer: dealerName,
                    drivingDistance: distance,
                    year: parseInt(year, 10),
                    model,
                    trim,
                    transmission: drivetrain,
                    exteriorColor: ext_color,
                    interiorColor: int_color,
                    numAvailable: 1,
                  })
                )
              );
            })
            .catch(() => {
              logger.warn(
                `Using internal API to fetch the inventory for dealer ${dealerName}`
              );
              // Use the internal API to fetch the inventory instead
              axios
                .get<Array<SubaruVehicleInventoryInternal>>(
                  `https://${hostname}/api/inventory/query`,
                  {
                    params: {
                      // This API does not support filtering by model, so we would have to filter from the results
                      filter: "VHlwZT0nTicgYW5kIChNYWtlPSdTdWJhcnUnKQ%3D%3D",
                      encoded: "true",
                    },
                  }
                )
                .then(({ data: internalData }) =>
                  resolve(
                    internalData.map(
                      ({
                        Dealership,
                        Model,
                        Transmission,
                        Trim,
                        Vin,
                        Year,
                      }) => ({
                        vin: Vin,
                        dealer: Dealership,
                        drivingDistance: distance,
                        year: Year,
                        model: Model,
                        trim: Trim,
                        transmission: Transmission,
                        exteriorColor: "",
                        interiorColor: "",
                        numAvailable: 1,
                      })
                    )
                  )
                )
                .catch((error) => {
                  logger.error(
                    `Both internal and external API calls fail for dealer ${dealerName} with message ${error.message}`
                  );
                  resolve([]);
                });
            });
        })
    );
    const inventories = await Promise.all(inventoryPromises);

    return {
      vehicles: inventories.flat(),
    };
  }
}
