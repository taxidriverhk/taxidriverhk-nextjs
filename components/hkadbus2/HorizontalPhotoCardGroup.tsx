import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import type { HorizontalPhotoCardPropType } from "components/hkadbus2/HorizontalPhotoCard";
import HorizontalPhotoCard from "components/hkadbus2/HorizontalPhotoCard";

import styles from "components/hkadbus2/styles/HorizontalPhotoCard.module.css";

export type HorizontalPhotoCardGroupPropType = {
  groupName: string;
  photoCards: Array<HorizontalPhotoCardPropType>;
};

export default function HorizontalPhotoCardGroup({
  groupName,
  photoCards,
}: HorizontalPhotoCardGroupPropType) {
  return (
    <Card
      className={styles["horizontal-photo-card-group-container"]}
      key={groupName}
    >
      <Card.Header>{groupName}</Card.Header>
      <ListGroup>
        {photoCards.map(({ href, photo, title }) => (
          <HorizontalPhotoCard
            key={title}
            href={href}
            photo={photo}
            title={title}
          />
        ))}
      </ListGroup>
    </Card>
  );
}
