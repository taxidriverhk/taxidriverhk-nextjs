import isEmpty from "lodash/isEmpty";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import type { SearchPhotoFilterPropType } from "components/hkadbus2/SearchPhotoFilters";
import SearchPhotoFilters from "components/hkadbus2/SearchPhotoFilters";
import SearchPhotoResults from "components/hkadbus2/SearchPhotoResults";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchSearchPhotos } from "shared/fetch/hkadbus2";
import { removeUndefinedAndLowercaseValues } from "shared/query/hkadbus2-query-builder";
import type {
  SearchPhotoQuery,
  SearchPhotoResult,
} from "shared/types/hkadbus2-types";

import { SortOrder } from "shared/types/hkadbus2-types";

type PropType = {
  filters: SearchPhotoFilterPropType;
  nextCursor: string | null;
  photos: Array<SearchPhotoResult>;
};

function HKAdbus2SearchBody({
  filters: initialFilters,
  nextCursor: initialNextCursor,
  photos: initialPhotos,
}: PropType) {
  const router = useRouter();

  const [photos, setPhotos] = useState<Array<SearchPhotoResult>>([]);
  const [validationErrors, setValidationErrors] =
    useState<SearchPhotoFilterPropType>({});
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialNextCursor
  );

  const t = useTranslations("hkadbus2");

  const { pathname } = router;

  useEffect(() => {
    setPhotos(initialPhotos);
  }, [initialPhotos]);

  const handleSearchCallback = useCallback(
    (nextFilters: SearchPhotoFilterPropType) => {
      const {
        keywords,
        route,
        fleetPrefix,
        fleetNumber,
        licensePlateNumber,
        uploadedBy,
      } = nextFilters;

      // Validate by simply checking if at least one input is provided
      const hasAtLeastOneInput = Object.values(nextFilters).reduce(
        (result, value) => result || !isEmpty(value),
        false
      );
      if (!hasAtLeastOneInput) {
        setValidationErrors({
          keywords: t("search-filter-validation-error"),
        });
        return;
      } else {
        setValidationErrors({});
      }

      const nextQuery: SearchPhotoQuery = removeUndefinedAndLowercaseValues({
        q: keywords,
        busRouteNumber: route,
        fleetPrefix,
        fleetNumber,
        licensePlateNumber,
        username: uploadedBy,
      });
      router.push({
        pathname,
        query: nextQuery,
      });
    },
    [pathname, router]
  );

  return (
    <>
      <SearchPhotoFilters
        filters={initialFilters}
        isFetching={false}
        onSearch={handleSearchCallback}
        validationErrors={validationErrors}
        translationFunc={t}
      />
      <SearchPhotoResults
        isFetching={false}
        isLoadMoreShown={nextCursor != null}
        // TODO: Implement me, should not be needed right now given the low volume of photos
        onLoadMore={() => {}}
        results={photos}
        translationFunc={t}
      />
    </>
  );
}

export default function HKAdbus2Search({
  filters,
  nextCursor,
  photos,
}: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdbus2SearchBody
        filters={filters}
        nextCursor={nextCursor}
        photos={photos}
      />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale, query } = context;
  if (Object.keys(query).length === 0) {
    return {
      props: {
        filters: {},
        nextCursor: null,
        photos: [],
      },
    };
  }

  const photoSearchQuery = query as SearchPhotoQuery;
  const {
    q,
    busRouteNumber,
    fleetPrefix,
    fleetNumber,
    licensePlateNumber,
    username,
  } = photoSearchQuery;
  const filters: SearchPhotoFilterPropType = removeUndefinedAndLowercaseValues({
    keywords: q,
    route: busRouteNumber,
    fleetPrefix,
    fleetNumber,
    licensePlateNumber,
    uploadedBy: username,
  });

  const { results, nextPageCursor } = await fetchSearchPhotos(
    photoSearchQuery,
    "uploadedDate",
    SortOrder.ASC,
    locale
  );

  return {
    props: {
      filters,
      nextCursor: nextPageCursor,
      photos: results,
    },
  };
}
