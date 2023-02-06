import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import Template from "components/Template";

type PropType = {};

export default function VehicleInventoryLookup({}: PropType) {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeItemIndex={2} path={currentPath}>
      Vehicle Inventory Lookup
    </Template>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  return {
    props: {},
  };
}
