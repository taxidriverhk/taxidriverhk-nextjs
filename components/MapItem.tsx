import classNames from "classnames";
import Figure from "react-bootstrap/Figure";
import ListGroup from "react-bootstrap/ListGroup";

import type { MapItem } from "shared/config/csMapData";
import {
  ReleaseStatus,
  releaseStatusDisplayText,
} from "shared/config/csMapData";

import styles from "components/styles/MapSection.module.css";

type PropType = {
  basePath: string;
  map: MapItem;
};

export default function MapItem({ basePath, map }: PropType) {
  const { id, icon, name, status } = map;
  const showStatus = status !== ReleaseStatus.Released;
  const isUnavailable = status === ReleaseStatus.Unavailable;
  const statusText = showStatus ? `[${releaseStatusDisplayText[status]}]` : "";
  return (
    <ListGroup.Item
      action={!isUnavailable}
      href={isUnavailable ? "" : `${basePath}/maps/${id}`}
    >
      <Figure className={styles["section-block"]}>
        <Figure.Image src={icon} />
        <Figure.Caption
          className={classNames(styles["section-text"], {
            "text-primary": status === ReleaseStatus.InProgress,
            "text-danger": isUnavailable,
          })}
        >{`${name} ${statusText}`}</Figure.Caption>
      </Figure>
    </ListGroup.Item>
  );
}
