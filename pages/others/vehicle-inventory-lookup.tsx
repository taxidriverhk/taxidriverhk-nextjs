import isEmpty from "lodash/isEmpty";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import Template from "components/Template";
import SearchInput from "components/vehicle-inventory-lookup/SearchInput";
import SearchResults from "components/vehicle-inventory-lookup/SearchResults";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Website } from "shared/config/website-config";
import { searchInventoryAsync } from "shared/fetch/vehicle-inventory-lookup";
import {
  VehicleBrand,
  VehicleInventory,
  VehicleInventorySearchQuery,
} from "shared/types/vehicle-inventory-lookup-types";

const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_QUERY: VehicleInventorySearchQuery = {
  year: CURRENT_YEAR + 1,
  brand: VehicleBrand.HONDA,
  model: "civic-si-sedan",
  zipCode: 91754,
  maxDealers: 40,
};

type PropType = {
  hasError?: boolean;
  query: VehicleInventorySearchQuery;
  vehicles: Array<VehicleInventory>;
};

export default function VehicleInventoryLookup({
  hasError,
  query,
  vehicles,
}: PropType) {
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
      {hasError === true && (
        <Alert variant="danger">
          An error occurred when trying to search for vehicles, please try again
          later.
        </Alert>
      )}
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
      props: {
        hasError,
        query: searchQuery,
        vehicles: [],
      },
    };
  }

  return {
    props: {
      query: searchQuery,
      vehicles,
    },
  };
}
