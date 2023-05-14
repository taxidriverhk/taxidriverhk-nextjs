import axios from "axios";
import logger from "logger";

import type {
  VehicleInventorySearchQuery,
  VehicleInventorySearchResponse,
} from "shared/types/vehicle-inventory-lookup-types";
import { VehicleInventoryService } from "shared/types/vehicle-inventory-lookup-types";

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
  async search({
    year,
    model,
    zipCode,
    maxDealers,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
    const { data } = await axios.get<{
      dealers: Array<HondaVehicleDealer>;
      inventory: Array<HondaVehicleInventory>;
    }>("https://automobiles.honda.com/platform/api/v3/inventoryAndDealers", {
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
      vehicles: data.inventory?.map(
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
  async search({
    year,
    model,
    zipCode,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
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
        // This has to be added to avoid the 403 error due to the call being made on the server side
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      }
    );

    logger.info(
      `${
        data.data?.locateVehiclesByZip?.vehicleSummary?.length ?? 0
      } vehicles found from Toyota inventory`
    );
    return {
      vehicles: data.data?.locateVehiclesByZip?.vehicleSummary.map(
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
      ),
    };
  }
}

export class SubaruVehicleInventoryService extends VehicleInventoryService {
  async search({
    year,
    model,
    zipCode,
  }: VehicleInventorySearchQuery): Promise<VehicleInventorySearchResponse> {
    return {
      vehicles: [],
    };
  }
}
