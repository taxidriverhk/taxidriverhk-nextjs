import type { NextApiRequest, NextApiResponse } from "next";

export type VehicleInventory = {};

export type VehicleInventorySearchRequest = {
  year: number;
  brand: string;
  model: string;
  zipCode: number;
  maxDealers: number;
};

export type VehicleInventorySearchResponse = {
  vehicles: Array<VehicleInventory>;
};

export async function getData(
  query: VehicleInventorySearchRequest
): Promise<VehicleInventorySearchResponse> {
  const { brand } = query;
  const inventoryService = SERVICE_PROVIDER[brand];
  return inventoryService.search(query);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VehicleInventorySearchResponse>
) {
  const query: VehicleInventorySearchRequest = {
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
    query: VehicleInventorySearchRequest
  ): VehicleInventorySearchResponse;
}

class HondaVehicleInventoryService extends VehicleInventoryService {
  search(query: VehicleInventorySearchRequest): VehicleInventorySearchResponse {
    return {
      vehicles: [],
    };
  }
}

class ToyotaVehicleInventoryService extends VehicleInventoryService {
  search(query: VehicleInventorySearchRequest): VehicleInventorySearchResponse {
    return {
      vehicles: [],
    };
  }
}

const SERVICE_PROVIDER: { [key: string]: VehicleInventoryService } = {
  honda: new HondaVehicleInventoryService(),
  toyota: new ToyotaVehicleInventoryService(),
};
