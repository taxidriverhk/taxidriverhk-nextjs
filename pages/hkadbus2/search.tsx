import isEmpty from "lodash/isEmpty";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import type { SearchPhotoFilterPropType } from "components/hkadbus2/SearchPhotoFilters";
import SearchPhotoFilters from "components/hkadbus2/SearchPhotoFilters";
import SearchPhotoResults from "components/hkadbus2/SearchPhotoResults";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import {
  fetchSearchPhotos,
  fetchSearchPhotosFromClientSide,
} from "shared/fetch/hkadbus2";
import { removeUndefinedAndLowercaseValues } from "shared/query/hkadbus2-query-builder";
import type {
  SearchPhotoQuery,
  SearchPhotoResult,
} from "shared/types/hkadbus2-types";

import { SortOrder } from "shared/types/hkadbus2-types";

const ORDER_BY = "uploadedDate";
const SORT = SortOrder.ASC;

type PropType = {
  filters: SearchPhotoFilterPropType;
  nextCursor: string | null;
  photos: Array<SearchPhotoResult>;
  total: number;
};

function HKAdbus2SearchBody({
  filters: initialFilters,
  nextCursor: initialNextCursor,
  photos: initialPhotos,
  total,
}: PropType) {
  const router = useRouter();
  const { locale, pathname, query } = router;

  const [photos, setPhotos] = useState<Array<SearchPhotoResult>>([]);
  const [validationErrors, setValidationErrors] =
    useState<SearchPhotoFilterPropType>({});
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialNextCursor
  );
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const t = useTranslations("hkadbus2");

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
    [pathname, router, t]
  );
  const handleLoadMoreCallback = useCallback(async () => {
    if (nextCursor == null) {
      return;
    }

    setIsLoadingMore(true);
    const { nextPageCursor, results: nextPhotos } =
      await fetchSearchPhotosFromClientSide(
        query as SearchPhotoQuery,
        ORDER_BY,
        SORT,
        locale,
        nextCursor
      );

    setPhotos([...photos, ...nextPhotos]);
    setNextCursor(nextPageCursor);
    setIsLoadingMore(false);
  }, [
    locale,
    query,
    photos,
    nextCursor,
    setIsLoadingMore,
    setPhotos,
    setNextCursor,
  ]);

  useEffect(() => {
    setPhotos(initialPhotos);
  }, [initialPhotos]);

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
        isLoadMoreDisabled={isLoadingMore}
        isLoadMoreShown={nextCursor != null}
        onLoadMore={handleLoadMoreCallback}
        results={photos}
        total={total}
        translationFunc={t}
      />
    </>
  );
}

export default function HKAdbus2Search({
  filters,
  nextCursor,
  photos,
  total,
}: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdbus2SearchBody
        filters={filters}
        nextCursor={nextCursor}
        photos={photos}
        total={total}
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
        total: 0,
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

  const { results, nextPageCursor, total } = await fetchSearchPhotos(
    photoSearchQuery,
    ORDER_BY,
    SORT,
    locale
  );

  return {
    props: {
      filters,
      nextCursor: nextPageCursor,
      photos: results,
      total,
    },
  };
}
