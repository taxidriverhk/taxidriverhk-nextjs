import isEmpty from "lodash/isEmpty";
import { useMemo } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import type { MapFilterInput } from "components/MapFilter";
import type { MapTutorial } from "shared/types/cs-map-types";
import { gameVersionBadgeColor } from "shared/types/cs-map-types";

import styles from "components/styles/Tutorial.module.css";

type PropType = {
  basePath: string;
  tutorials: Array<MapTutorial>;
  filter: MapFilterInput;
  showDraftPosts: boolean;
};

export default function TutorialSection({
  basePath,
  filter,
  tutorials,
  showDraftPosts,
}: PropType) {
  const { sort } = filter;

  const filteredTutorials = useMemo(
    () =>
      tutorials
        .filter(
          (tutorial) =>
            (!tutorial.isDraft || showDraftPosts) &&
            filter.versions.includes(tutorial.targetGameVersion)
        )
        .sort((tutorialA, tutorialB) =>
          sort === "releaseDate"
            ? tutorialA.lastUpdateDate.localeCompare(tutorialB.lastUpdateDate)
            : tutorialA.title.localeCompare(tutorialB.title)
        ),
    [filter, tutorials, showDraftPosts, sort]
  );

  const tutorialItems = filteredTutorials.map(
    ({
      creationDate,
      isDraft,
      thumbnail,
      hashKey,
      title,
      targetGameVersion,
      lastUpdateDate,
    }) => (
      <ListGroupItem
        action
        className={styles["item-container"]}
        href={`${basePath}/tutorials/${hashKey}`}
        key={hashKey}
      >
        <Image alt={title} src={thumbnail} />
        <div className={styles["item-body"]}>
          {isDraft ? "[DRAFT] " : ""}
          {title}
          <div>
            <Badge bg="dark">{creationDate}</Badge>{" "}
            {creationDate !== lastUpdateDate && (
              <>
                <Badge bg="danger">[Updated] {lastUpdateDate}</Badge>{" "}
              </>
            )}
            <Badge bg={gameVersionBadgeColor[targetGameVersion]}>
              {targetGameVersion}
            </Badge>
          </div>
        </div>
      </ListGroupItem>
    )
  );

  return (
    <Card bg="light" border="info" className={styles["section-container"]}>
      <Card.Header>Tutorials</Card.Header>
      <ListGroup>
        {isEmpty(filteredTutorials) ? (
          <ListGroupItem>None</ListGroupItem>
        ) : (
          tutorialItems
        )}
      </ListGroup>
    </Card>
  );
}
