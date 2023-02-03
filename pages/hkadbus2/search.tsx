import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchSearchPhotos } from "shared/fetch/hkadbus2";
import type { SearchPhotoQuery } from "shared/types/hkadbus2-types";
import { SortOrder } from "shared/types/hkadbus2-types";

type PropType = {
  photos: Array<any>;
};

export default function HKAdbus2Search({ photos }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <pre>{JSON.stringify(photos, null, 2)}</pre>
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
      photos: results,
    },
  };
}
