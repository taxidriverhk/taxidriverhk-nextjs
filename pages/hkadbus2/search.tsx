import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SearchPhotoFilters from "components/hkadbus2/SearchPhotoFilters";
import SearchPhotoResults from "components/hkadbus2/SearchPhotoResults";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchSearchPhotos } from "shared/fetch/hkadbus2";
import type { SearchPhotoQuery } from "shared/types/hkadbus2-types";

import { SortOrder } from "shared/types/hkadbus2-types";

type PropType = {
  photos: Array<any>;
  query: any;
};

export default function HKAdbus2Search({
  photos: initialPhotos,
  query,
}: PropType) {
  const router = useRouter();
  const [photos, setPhotos] = useState<Array<any>>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    setPhotos(initialPhotos);
  }, [initialPhotos]);
  useEffect(() => {
    setFilters(query);
  }, [query]);

  const { pathname } = router;

  return (
    <HKAdBus2TemplateContainer>
      <SearchPhotoFilters
        filters={filters}
        isFetching={false}
        onSearch={() => {
          router.push({
            pathname,
            query: {
              ...filters,
              advertisementId: "titoni",
            },
          });
        }}
      />
      <SearchPhotoResults
        isFetching={false}
        isLoadMoreShown={false}
        onLoadMore={() => {
          // Just to test how the photos work
          setPhotos([...photos, ...photos]);
        }}
        results={photos}
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
        query,
        photos: [],
      },
    };
  }

  const photoSearchQuery = query as SearchPhotoQuery;
  const { results } = await fetchSearchPhotos(
    photoSearchQuery,
    "uploadedDate",
    SortOrder.ASC,
    locale
  );

  return {
    props: {
      query,
      photos: results,
    },
  };
}
