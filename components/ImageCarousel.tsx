import Carousel from "react-bootstrap/Carousel";

import styles from "components/styles/ImageCarousel.module.css";

type PropType = {
  images: Array<{
    caption?: string;
    url: string;
  }>;
};

export default function ImageCarousel({ images }: PropType) {
  return (
    <Carousel className={styles["carousel-container"]} interval={null}>
      {images.map(({ url, caption }) => (
        <Carousel.Item key={url}>
          <img alt={caption} src={url} />
          <Carousel.Caption className={styles["carousel-caption"]}>
            {caption}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
