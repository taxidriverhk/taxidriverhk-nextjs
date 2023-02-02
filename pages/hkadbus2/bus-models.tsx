import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { HorizontalPhotoCardGroupPropType } from "components/hkadbus2/HorizontalPhotoCardGroup";
import HorizontalPhotoCardGroup from "components/hkadbus2/HorizontalPhotoCardGroup";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetBusModels } from "shared/fetch/hkadbus2";
import type { BusModel } from "shared/types/hkadbus2-types";

type PropType = {
  busModelGroups: Array<HorizontalPhotoCardGroupPropType>;
};

export default function HKAdbus2BusModels({ busModelGroups }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      {busModelGroups.map(({ groupName, photoCards }) => (
        <HorizontalPhotoCardGroup
          key={groupName}
          groupName={groupName}
          photoCards={photoCards}
        />
      ))}
    </HKAdBus2TemplateContainer>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { locale } = context;
  const { busModels } = await fetchGetBusModels(locale);

  const busBrandModelMap = busModels.reduce(
    (result: { [key: string]: Array<BusModel> }, busModel) => {
      const { busBrandName } = busModel;
      if (result[busBrandName]) {
        result[busBrandName].push(busModel);
      } else {
        result[busBrandName] = [busModel];
      }
      return result;
    },
    {}
  );
  const busModelGroups: Array<HorizontalPhotoCardGroupPropType> =
    Object.entries(busBrandModelMap).map(([groupName, busModels]) => ({
      photoCards: busModels.map(({ id, name, thumbnail }) => ({
        href: `bus-models/${id}`,
        title: name,
        photo: thumbnail,
      })),
      groupName,
    }));

  return {
    props: {
      busModelGroups,
    },
  };
}
