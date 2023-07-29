import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import styles from "components/hkadbus2/styles/PhotoCard.module.css";

export enum PhotoColor {
  Blue = "primary",
  Green = "success",
  LightBlue = "info",
  None = "light",
  Red = "danger",
  Yellow = "warning",
}

export type PhotoCardPropType = {
  backgroundColor?: PhotoColor | string;
  extra?: string;
  href?: string;
  photo: string;
  subtitle?: string;
  title?: string;
};

export default function PhotoCard({
  backgroundColor = PhotoColor.None,
  extra,
  href,
  photo,
  subtitle,
  title,
}: PhotoCardPropType) {
  const isBuiltInColor = Object.values(PhotoColor).includes(
    backgroundColor as PhotoColor
  );

  return (
    <Button
      className={styles["photo-card-container"]}
      href={href}
      variant="none"
    >
      <Card
        bg={isBuiltInColor ? backgroundColor : PhotoColor.None}
        border="secondary"
        text={backgroundColor === PhotoColor.None ? "dark" : "white"}
      >
        <Card.Img
          alt={title}
          className={styles["photo-card-image"]}
          variant="top"
          src={photo}
        />
        <Card.Body
          style={
            isBuiltInColor
              ? {}
              : {
                  backgroundColor,
                }
          }
        >
          <Card.Subtitle>{title}</Card.Subtitle>
          <Card.Text>{subtitle}</Card.Text>
        </Card.Body>
        {extra && (
          <Card.Footer>
            <small className="text-muted">{extra}</small>
          </Card.Footer>
        )}
      </Card>
    </Button>
  );
}
