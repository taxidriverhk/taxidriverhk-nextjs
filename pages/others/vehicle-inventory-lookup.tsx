import isEmpty from "lodash/isEmpty";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import Template from "components/Template";
import SearchInput from "components/vehicle-inventory-lookup/SearchInput";
import type {
  VehicleInventory,
  VehicleInventorySearchQuery,
} from "pages/api/vehicle-inventory-lookup/search";
import { getData } from "pages/api/vehicle-inventory-lookup/search";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_QUERY: VehicleInventorySearchQuery = {
  year: 2023,
  brand: "honda",
  model: "civic-si-sedan",
  zipCode: 91754,
  maxDealers: 40,
};

type PropType = {
  query: VehicleInventorySearchQuery;
  vehicles: Array<VehicleInventory>;
};

export default function VehicleInventoryLookup({ query, vehicles }: PropType) {
  const router = useRouter();
  const { asPath: currentPath, pathname } = router;

  const handleSubmit = useCallback((nextQuery: VehicleInventorySearchQuery) => {
    if (
      (!Number.isInteger(nextQuery.zipCode) && isEmpty(nextQuery.zipCode)) ||
      (!Number.isInteger(nextQuery.maxDealers) && isEmpty(nextQuery.maxDealers))
    ) {
      setHasValidationError(true);
      return;
    }

    setHasValidationError(false);
    setIsSearching(true);
    router.push({
      pathname,
      query: nextQuery,
    });
  }, []);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => setIsSearching(false), [query]);

  return (
    <Template activeItemIndex={2} path={currentPath}>
      <SearchInput
        hasValidationError={hasValidationError}
        isDisabled={isSearching}
        query={query}
        onSubmit={handleSubmit}
      />
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
        query: DEFAULT_QUERY,
        vehicles: [],
      },
    };
  }

  const searchQuery = query as VehicleInventorySearchQuery;
  const { hasError, vehicles } = await getData(searchQuery);
  if (hasError || vehicles == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      query: searchQuery,
      vehicles,
    },
  };
}
