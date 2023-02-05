import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetPhoto } from "shared/fetch/hkadbus2";

type PropType = {
  photo: any;
};

function HKAdbus2PhotoDetailsBody({ photo }: PropType) {
  return <pre>{JSON.stringify(photo, null, 2)}</pre>;
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

  const { photo } = await fetchGetPhoto(Number.parseInt(photoId), locale);
  return {
    props: {
      photo,
    },
  };
}
