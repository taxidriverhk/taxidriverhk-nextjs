import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";
import Card from "react-bootstrap/Card";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetAdvertisements } from "shared/fetch/hkadbus2";
import { buildPhotoSearchUrl } from "shared/query/hkadbus2-query-builder";
import type { SearchPhotoQuery } from "shared/types/hkadbus2-types";

type PropType = {
  advertisementPhotoCards: Array<PhotoCardPropType>;
  categoryName: string;
};

function HKAdbus2AdvertisementsBody({
  advertisementPhotoCards,
  categoryName,
}: PropType) {
  const t = useTranslations("hkadbus2");
  return (
    <>
      <Card>
        <Card.Body>{t("current-category", { categoryName })}</Card.Body>
      </Card>
      <PhotoCardList photos={advertisementPhotoCards} />
    </>
  );
}

export default function HKAdbus2Advertisements({
  advertisementPhotoCards,
  categoryName,
}: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdbus2AdvertisementsBody
        advertisementPhotoCards={advertisementPhotoCards}
        categoryName={categoryName}
      />
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

  const { advertisements, notFound } = await fetchGetAdvertisements(
    categoryId,
    locale
  );
  if (
    advertisements == null ||
    advertisements.length === 0 ||
    notFound === true
  ) {
    return {
      notFound: true,
    };
  }

  const categoryName = advertisements[0].categoryName;
  const advertisementPhotoCards = advertisements.map(
    ({ id, name, thumbnail }) => {
      const searchQuery: SearchPhotoQuery = {
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
      categoryName,
      advertisementPhotoCards,
    },
  };
}
