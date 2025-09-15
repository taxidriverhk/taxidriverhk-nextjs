import { VehicleBrand } from "shared/types/vehicle-inventory-lookup-types";

export const MAX_INVENTORIES: number = 1000;

export const brands: Map<VehicleBrand, string> = new Map<VehicleBrand, string>([
  [VehicleBrand.HONDA, "Honda"],
  [VehicleBrand.TOYOTA, "Toyota"],
  [VehicleBrand.SUBARU, "Subaru"],
]);

export const models: Map<VehicleBrand, string[][]> = new Map<
  VehicleBrand,
  string[][]
>([
  [
    VehicleBrand.HONDA,
    [
      ["Civic Sedan", "civic-sedan"],
      ["Civic Coupe", "civic-coupe"],
      ["Civic Si Sedan", "civic-si-sedan"],
      ["Civic Si Coupe", "civic-si-coupe"],
      ["Civic Hatchback", "civic-hatchback"],
      ["Civic Type R", "civic-type-r"],
      ["Accord Sedan", "accord-sedan"],
      ["HR-V", "hr-v"],
      ["CR-V", "cr-v"],
      ["Insight", "insight"],
      ["Passport", "passport"],
      ["Pilot", "pilot"],
      ["Accord Hybrid", "accord-hybrid"],
      ["CR-V Hybrid", "cr-v-hybrid"],
      ["Ridgeline", "ridgeline"],
      ["Odyssey", "odyssey"],
    ],
  ],
  [
    VehicleBrand.TOYOTA,
    [
      ["Corolla", "corolla"],
      ["GR Corolla", "grcorolla"],
    ],
  ],
  [VehicleBrand.SUBARU, [["WRX", "wrx"]]],
]);
