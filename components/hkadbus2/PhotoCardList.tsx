import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCard from "components/hkadbus2/PhotoCard";

import styles from "components/hkadbus2/styles/PhotoCard.module.css";

type PropType = {
  photos: Array<PhotoCardPropType>;
};

export default function PhotoCardList({ photos }: PropType) {
  return (
    <Row xs={1} md={2} lg={4}>
      {photos.map(
        ({ backgroundColor, extra, href, photo, subtitle, title }) => (
          <Col className={styles["photo-card-grid"]} key={photo}>
            <PhotoCard
              backgroundColor={backgroundColor}
              extra={extra}
              href={href}
              photo={photo}
              subtitle={subtitle}
              title={title}
            />
          </Col>
        )
      )}
    </Row>
  );
}
