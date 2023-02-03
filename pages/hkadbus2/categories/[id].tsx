import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetAdvertisements } from "shared/fetch/hkadbus2";
import type { PhotoSearchQuery } from "shared/query/hkadbus2-query-builder";
import { buildPhotoSearchUrl } from "shared/query/hkadbus2-query-builder";

type PropType = {
  advertisementPhotoCards: Array<PhotoCardPropType>;
};

export default function HKAdbus2Advertisements({
  advertisementPhotoCards,
}: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <PhotoCardList photos={advertisementPhotoCards} />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale, query } = context;
  const { id: categoryId } = query;
  if (categoryId == null || Array.isArray(categoryId)) {
    return {
      notFound: true,
    };
  }

  const { advertisements } = await fetchGetAdvertisements(categoryId, locale);
  const advertisementPhotoCards = advertisements.map(
    ({ id, name, thumbnail }) => {
      const searchQuery: PhotoSearchQuery = {
        advertisementId: id,
      };
      return {
        href: `../${buildPhotoSearchUrl(searchQuery)}`,
        photo: thumbnail,
        title: name,
      };
    }
  );

  return {
    props: {
      advertisementPhotoCards,
    },
  };
}
