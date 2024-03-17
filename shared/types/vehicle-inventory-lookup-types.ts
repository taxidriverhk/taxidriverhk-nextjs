export enum VehicleBrand {
  HONDA = "honda",
  TOYOTA = "toyota",
  SUBARU = "subaru",
}

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
  brand?: VehicleBrand;
  model?: string;
  zipCode?: number;
  maxDealers?: number;
};

export type VehicleInventorySearchResponse = {
  vehicles?: Array<VehicleInventory>;
  hasError?: boolean;
};

export abstract class VehicleInventoryService {
  abstract searchAsync(
    query: VehicleInventorySearchQuery
  ): Promise<VehicleInventorySearchResponse>;
}
