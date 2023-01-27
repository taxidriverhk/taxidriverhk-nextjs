import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetCategories } from "shared/fetch/hkadbus2";
import type { GetCategoriesResponse } from "shared/types/hkadbus2-types";

type PropType = {
  data: GetCategoriesResponse;
};

export default function HKAdbus2Categories({ data }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale } = context;
  const data = await fetchGetCategories(locale);

  return {
    props: {
      data,
    },
  };
}
