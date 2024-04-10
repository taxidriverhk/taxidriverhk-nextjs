import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

type PropType = {
  link: string;
  mirrorIndex?: number;
};

export default function DownloadButton({ link, mirrorIndex }: PropType) {
  if (link.includes("steam")) {
    return (
      <Button variant="success" href={link}>
        <FontAwesomeIcon icon={faSteam} /> Subscribe
      </Button>
    );
  }

  let text = null;
  if (mirrorIndex != null) {
    text = `Download (Mirror ${mirrorIndex + 1})`;
  } else {
    text = "Download";
  }

  return <Button href={link}>{text}</Button>;
}
