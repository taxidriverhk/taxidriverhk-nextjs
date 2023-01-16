import Carousel from "react-bootstrap/Carousel";

type PropType = {
  images: Array<{
    caption?: string;
    url: string;
  }>;
};

export default function ImageCarousel({ images }: PropType) {
  return (
    <Carousel interval={null}>
      {images.map(({ url, caption }) => (
        <Carousel.Item key={url}>
          <img alt={caption} src={url} />
          <Carousel.Caption>{caption}</Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
