import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from "next-intl";

import PhotoDetails from "components/hkadbus2/PhotoDetails";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { getPhotoAsync } from "shared/fetch/hkadbus2";
import type { Photo } from "shared/types/hkadbus2-types";

type PropType = {
  photo: Photo;
};

function HKAdbus2PhotoDetailsBody({ photo }: PropType) {
  const t = useTranslations("hkadbus2");
  return <PhotoDetails photo={photo} translationFunc={t} />;
}

export default function HKAdbus2PhotoDetails({ photo }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <HKAdbus2PhotoDetailsBody photo={photo} />
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale, query } = context;
  const { id: photoId } = query;
  if (photoId == null || Array.isArray(photoId) || Number.isNaN(photoId)) {
    return {
      notFound: true,
    };
  }

  const { photo, notFound } = await getPhotoAsync(
    Number.parseInt(photoId),
    locale
  );
  if (photo == null || notFound === true) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      photo,
    },
  };
}
