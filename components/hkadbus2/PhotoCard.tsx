import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "components/hkadbus2/styles/PhotoCard.module.css";

export enum PhotoColor {
  Blue = "primary",
  Green = "success",
  LightBlue = "info",
  None = "default",
  Red = "danger",
  Yellow = "warning",
}

export type PhotoCardPropType = {
  backgroundColor?: PhotoColor;
  href?: string;
  photo: string;
  subtitle?: string;
  title?: string;
};

export default function PhotoCard({
  backgroundColor = PhotoColor.None,
  href,
  photo,
  subtitle,
  title,
}: PhotoCardPropType) {
  return (
    <Button
      className={styles["photo-card-container"]}
      href={href}
      variant={backgroundColor}
    >
      <Card
        bg={backgroundColor}
        border="secondary"
        text={backgroundColor === PhotoColor.None ? "dark" : "white"}
      >
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Subtitle>{title}</Card.Subtitle>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
      </Card>
    </Button>
  );
}
