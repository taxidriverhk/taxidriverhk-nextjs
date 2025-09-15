import {
  HondaVehicleInventoryService,
  SubaruVehicleInventoryService,
  ToyotaVehicleInventoryService,
} from "shared/fetch/vehicle-inventory-lookup-impl";
import type {
  VehicleInventorySearchResponse,
  VehicleInventoryService,
} from "shared/types/vehicle-inventory-lookup-types";
import {
  VehicleBrand,
  VehicleInventorySearchQuery,
} from "shared/types/vehicle-inventory-lookup-types";

export async function searchInventoryAsync(
  query: VehicleInventorySearchQuery
): Promise<VehicleInventorySearchResponse> {
  const { brand } = query;
  if (brand == null) {
    return {
      hasError: true,
    };
  }

  const inventoryService = SERVICE_PROVIDER.get(brand);
  if (inventoryService == null) {
    return {
      hasError: true,
    };
  }

  return inventoryService.searchAsync(query).catch(() => ({
    hasError: true,
  }));
}

const SERVICE_PROVIDER: Map<VehicleBrand, VehicleInventoryService> = new Map<
  VehicleBrand,
  VehicleInventoryService
>([
  [VehicleBrand.HONDA, new HondaVehicleInventoryService()],
  [VehicleBrand.TOYOTA, new ToyotaVehicleInventoryService()],
  [VehicleBrand.SUBARU, new SubaruVehicleInventoryService()],
]);
