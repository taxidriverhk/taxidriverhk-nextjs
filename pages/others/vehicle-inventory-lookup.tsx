import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import Template from "components/Template";
import type {
  VehicleInventory,
  VehicleInventorySearchRequest,
} from "pages/api/vehicle-inventory-lookup/search";
import { getData } from "pages/api/vehicle-inventory-lookup/search";

type PropType = {
  vehicles: Array<VehicleInventory>;
};

export default function VehicleInventoryLookup({ vehicles }: PropType) {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeItemIndex={2} path={currentPath}>
      <pre>{JSON.stringify(vehicles, null, 2)}</pre>
    </Template>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { query } = context;
  if (Object.keys(query).length === 0) {
    return {
      props: {
        vehicles: [],
      },
    };
  }

  const searchQuery: VehicleInventorySearchRequest = {
    year: 2023,
    brand: "honda",
    model: "civic-sedan",
    zipCode: 91770,
    maxDealers: 40,
  };
  const { vehicles } = await getData(searchQuery);
  return {
    props: {
      vehicles,
    },
  };
}
