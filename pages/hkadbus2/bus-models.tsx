import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { HKAdBus2TemplateContainer } from "pages/hkadbus2/index";
import { fetchGetBusModels } from "shared/fetch/hkadbus2";
import type { BusModel } from "shared/types/hkadbus2-types";

type BusModelCard = {
  id: string;
  title: string;
  photo: string;
};

type BusModelGroup = {
  busModelCards: Array<BusModelCard>;
  groupName: string;
};

type PropType = {
  busModelGroups: Array<BusModelGroup>;
};

export default function HKAdbus2BusModels({ busModelGroups }: PropType) {
  return (
    <HKAdBus2TemplateContainer>
      {busModelGroups.map(({ groupName, busModelCards }) => (
        <Card>
          <Card.Header>{groupName}</Card.Header>
          <ListGroup>
            {busModelCards.map(({ title }) => (
              <ListGroup.Item>{title}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
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
  const busModelGroups: Array<BusModelGroup> = Object.entries(
    busBrandModelMap
  ).map(([groupName, busModels]) => ({
    busModelCards: busModels.map(({ id, name, thumbnail }) => ({
      id: id,
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
