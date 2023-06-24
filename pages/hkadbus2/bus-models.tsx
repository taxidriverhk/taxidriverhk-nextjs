import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { HorizontalPhotoCardGroupPropType } from "components/hkadbus2/HorizontalPhotoCardGroup";
import HorizontalPhotoCardGroup from "components/hkadbus2/HorizontalPhotoCardGroup";
import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetBusModels } from "shared/fetch/hkadbus2";
import { buildPhotoSearchUrl } from "shared/query/hkadbus2-query-builder";
import type { BusModel, SearchPhotoQuery } from "shared/types/hkadbus2-types";

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

  // Order by bus brand name first, then followed by bus model name
  const sortedBusModels = busModels.sort((m1, m2) =>
    m1.busBrandName.localeCompare(m2.busBrandName)
  );
  const busBrandModelMap = sortedBusModels.reduce(
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
      photoCards: busModels
        .sort((m1, m2) => m1.name.localeCompare(m2.name))
        .map(({ id, name, thumbnail }) => {
          const searchQuery: SearchPhotoQuery = {
            busModelId: id,
          };
          return {
            href: buildPhotoSearchUrl(searchQuery),
            title: name,
            photo: thumbnail,
          };
        }),
      groupName,
    }));

  return {
    props: {
      busModelGroups,
    },
  };
}
