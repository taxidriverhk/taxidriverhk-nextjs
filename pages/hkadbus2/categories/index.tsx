import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetCategories } from "shared/fetch/hkadbus2";

type PropType = {
  categoryPhotoCards: Array<PhotoCardPropType>;
};

export default function HKAdbus2Categories({ categoryPhotoCards }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <PhotoCardList photos={categoryPhotoCards} />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale } = context;
  const { categories } = await fetchGetCategories(locale);

  const categoryPhotoCards = categories.map(({ id, name, thumbnail }) => ({
    href: `categories/${id}`,
    photo: thumbnail,
    title: name,
  }));

  return {
    props: {
      categoryPhotoCards,
    },
  };
}
