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
