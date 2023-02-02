import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "components/hkadbus2/styles/HorizontalPhotoCard.module.css";

export type HorizontalPhotoCardPropType = {
  href?: string;
  photo: string;
  title: string;
};

export default function HorizontalPhotoCard({
  href,
  photo,
  title,
}: HorizontalPhotoCardPropType) {
  return (
    <ListGroup.Item action key={title} href={href}>
      <Image alt={title} src={photo} thumbnail width={250} />
      <span className={styles["horizontal-photo-card-title"]}>{title}</span>
    </ListGroup.Item>
  );
}
