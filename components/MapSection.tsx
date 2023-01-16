import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import MapItem from "components/MapItem";
import type {
  MapCategory,
  MapItem as MapItemType,
} from "shared/config/csMapData";

import styles from "components/styles/MapSection.module.css";

type PropType = {
  basePath: string;
  category: MapCategory;
  maps: Array<MapItemType>;
};

export default function MapSection({ basePath, category, maps }: PropType) {
  const { abbr: categoryAbbr, fullName: categoryName } = category;
  return (
    <Card bg="light" border="dark" className={styles["section-container"]}>
      <Card.Header>{`${categoryAbbr} (${categoryName})`}</Card.Header>
      <ListGroup>
        {maps.map((map) => (
          <MapItem key={map.id} basePath={basePath} map={map} />
        ))}
      </ListGroup>
    </Card>
  );
}
