import classNames from "classnames";
import Badge from "react-bootstrap/Badge";
import Figure from "react-bootstrap/Figure";
import ListGroup from "react-bootstrap/ListGroup";

import type { MapItem } from "shared/config/cs-map-config";
import {
  ReleaseStatus,
  gameVersionBadgeColor,
  releaseStatusDisplayText,
} from "shared/config/cs-map-config";

import styles from "components/styles/MapSection.module.css";

type PropType = {
  basePath: string;
  map: MapItem;
};

export default function MapItem({ basePath, map }: PropType) {
  const {
    icon,
    name,
    progressPercentage,
    releaseDate,
    status,
    targetGameVersion,
  } = map;
  const showStatus = status !== ReleaseStatus.Released;
  const isUnavailable = status === ReleaseStatus.Unavailable;
  const statusText = showStatus ? releaseStatusDisplayText[status] : null;
  return (
    <ListGroup.Item
      action={!isUnavailable}
      href={isUnavailable ? "" : `${basePath}/maps/${name}`}
    >
      <Figure className={styles["section-block"]}>
        <Figure.Image alt={name} className={styles["item-image"]} src={icon} />
        <Figure.Caption
          className={classNames(styles["section-text"], {
            "text-primary": status === ReleaseStatus.InProgress,
            "text-danger": isUnavailable,
          })}
        >
          {name}
          <div>
            <Badge bg="dark">{releaseDate}</Badge>{" "}
            <Badge bg={gameVersionBadgeColor[targetGameVersion]}>
              {targetGameVersion}
            </Badge>
            {statusText != null && (
              <>
                {" "}
                <Badge
                  bg={status === ReleaseStatus.InProgress ? "info" : "danger"}
                >
                  {statusText}
                  {progressPercentage != null && ` (${progressPercentage}%)`}
                </Badge>
              </>
            )}
          </div>
        </Figure.Caption>
      </Figure>
    </ListGroup.Item>
  );
}
