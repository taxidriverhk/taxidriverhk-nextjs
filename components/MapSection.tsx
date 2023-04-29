import { useMemo } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import type { MapFilterInput } from "components/MapFilter";
import MapItem from "components/MapItem";
import type {
  MapCategory,
  MapItem as MapItemType,
} from "shared/config/cs-map-config";

import styles from "components/styles/MapSection.module.css";

type PropType = {
  basePath: string;
  category: MapCategory;
  filter: MapFilterInput;
  maps: Array<MapItemType>;
};

export default function MapSection({
  basePath,
  category,
  filter,
  maps,
}: PropType) {
  const { abbr: categoryAbbr, fullName: categoryName } = category;
  const { versions, sort } = filter;

  const filteredMaps = useMemo(
    () =>
      maps
        .filter(({ targetGameVersion }) => {
          if (versions.length > 0) {
            return versions.includes(targetGameVersion);
          }
          return true;
        })
        .sort((mapA, mapB) =>
          sort === "releaseDate"
            ? mapA.releaseDate.localeCompare(mapB.releaseDate)
            : mapA.name.localeCompare(mapB.name)
        ),
    [maps, sort, versions]
  );

  return (
    <Card bg="light" border="dark" className={styles["section-container"]}>
      <Card.Header>{`${categoryAbbr} (${categoryName})`}</Card.Header>
      <ListGroup>
        {filteredMaps.map((map) => (
          <MapItem key={map.id} basePath={basePath} map={map} />
        ))}
      </ListGroup>
    </Card>
  );
}
