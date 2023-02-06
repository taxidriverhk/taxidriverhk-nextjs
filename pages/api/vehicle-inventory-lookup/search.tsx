import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type VehicleInventory = {
  vin: string;
  dealer: string;
  drivingDistance: number;
  year: number;
  model: string;
  trim: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  numAvailable: number;
};

export type VehicleInventorySearchQuery = {
  year?: number;
  brand?: string;
  model?: string;
  zipCode?: number;
  maxDealers?: number;
};

export type VehicleInventorySearchResponse = {
  vehicles?: Array<VehicleInventory>;
  hasError?: boolean;
};

export async function getData(
  query: VehicleInventorySearchQuery
): Promise<VehicleInventorySearchResponse> {
  const { brand } = query;
  if (brand == null) {
    return {
      hasError: true,
    };
  }

  const inventoryService = SERVICE_PROVIDER[brand];
  return inventoryService.search(query);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VehicleInventorySearchResponse>
) {
  // TODO: convert the request to a query
  const query: VehicleInventorySearchQuery = {
    year: 2023,
    brand: "honda",
    model: "civic-si",
    zipCode: 91770,
    maxDealers: 40,
  };
  const data = await getData(query);
  res.status(200).json(data);
}

abstract class VehicleInventoryService {
  abstract search(
    query: VehicleInventorySearchQuery
  ): Promise<VehicleInventorySearchResponse>;
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

class HondaVehicleInventoryService extends VehicleInventoryService {
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

class ToyotaVehicleInventoryService extends VehicleInventoryService {
  async search(
    query: VehicleInventorySearchQuery
  ): Promise<VehicleInventorySearchResponse> {
    return {
      vehicles: [],
    };
  }
}

const SERVICE_PROVIDER: { [key: string]: VehicleInventoryService } = {
  honda: new HondaVehicleInventoryService(),
  toyota: new ToyotaVehicleInventoryService(),
};
