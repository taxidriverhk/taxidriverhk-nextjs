import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import ListGroup from "react-bootstrap/ListGroup";

import type { MapCategory, MapItem } from "shared/config/csMapData";

type PropType = {
  basePath: string;
  category: MapCategory;
  maps: Array<MapItem>;
};

export default function MapSection({ basePath, category, maps }: PropType) {
  const { abbr: categoryAbbr, fullName: categoryName } = category;
  return (
    <Card bg="light" border="dark">
      <Card.Header>{`${categoryAbbr} (${categoryName})`}</Card.Header>
      <ListGroup>
        {maps.map(({ id, icon, name, status }) => (
          <ListGroup.Item action href={`${basePath}/maps/${id}`} key={id}>
            <Figure>
              <Figure.Image src={icon} />
              <Figure.Caption>{`${name} [${status}]`}</Figure.Caption>
            </Figure>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
