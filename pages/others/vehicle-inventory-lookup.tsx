import isEmpty from "lodash/isEmpty";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import Template from "components/Template";
import SearchInput from "components/vehicle-inventory-lookup/SearchInput";
import SearchResults from "components/vehicle-inventory-lookup/SearchResults";
import { useCallback, useEffect, useState } from "react";
import { Website } from "shared/config/website-config";
import { searchInventoryAsync } from "shared/fetch/vehicle-inventory-lookup";
import {
  VehicleBrand,
  VehicleInventory,
  VehicleInventorySearchQuery,
} from "shared/types/vehicle-inventory-lookup-types";

const DEFAULT_QUERY: VehicleInventorySearchQuery = {
  year: 2023,
  brand: VehicleBrand.HONDA,
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

  const handleSubmit = useCallback(
    (nextQuery: VehicleInventorySearchQuery) => {
      if (
        (!Number.isInteger(nextQuery.zipCode) && isEmpty(nextQuery.zipCode)) ||
        (!Number.isInteger(nextQuery.maxDealers) &&
          isEmpty(nextQuery.maxDealers))
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
    },
    [pathname, router]
  );
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => setIsSearching(false), [query]);

  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <SearchInput
        hasValidationError={hasValidationError}
        isDisabled={isSearching}
        query={query}
        onSubmit={handleSubmit}
      />
      <SearchResults vehicles={vehicles} />
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
  const { hasError, vehicles } = await searchInventoryAsync(searchQuery);
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
