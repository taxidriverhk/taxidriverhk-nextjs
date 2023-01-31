import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import PhotoCard from "components/hkadbus2/PhotoCard";

type PropType = {
  photos: Array<PhotoCardPropType>;
};

export default function PhotoCardList({ photos }: PropType) {
  return (
    <Row xs={1} md={2} lg={4}>
      {photos.map(({ backgroundColor, href, photo, subtitle, title }) => (
        <Col key={photo}>
          <PhotoCard
            backgroundColor={backgroundColor}
            href={href}
            photo={photo}
            subtitle={subtitle}
            title={title}
          />
        </Col>
      ))}
    </Row>
  );
}
