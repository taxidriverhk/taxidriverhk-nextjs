import {
  faDropbox,
  faGoogleDrive,
  faMicrosoft,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import customProtocolCheck from "custom-protocol-check";
import { useCallback, useMemo } from "react";
import Button from "react-bootstrap/Button";

type PropType = {
  link: string;
  mirrorIndex?: number;
};

const ICON_MAPPING = new Map([
  ["1drv.ms", faMicrosoft],
  ["dropbox.com", faDropbox],
  ["drive.google.com", faGoogleDrive],
]);

export default function DownloadButton({ link, mirrorIndex }: PropType) {
  const onSteamLinkClick = useCallback(() => {
    customProtocolCheck(link, () =>
      window.open("https://store.steampowered.com/about/", "_blank")
    );
  }, [link]);
  const nonSteamIcon = useMemo(() => {
    const iconKeys = Array.from(ICON_MAPPING.keys());
    const matchedKey = iconKeys.find((iconKey) => link.includes(iconKey));
    return matchedKey != null ? ICON_MAPPING.get(matchedKey) : null;
  }, [link]);

  if (link.startsWith("steam://")) {
    return (
      <Button variant="success" onClick={onSteamLinkClick}>
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

  return (
    <Button href={link}>
      {nonSteamIcon != null && (
        <>
          <FontAwesomeIcon icon={nonSteamIcon} />
          {` `}
        </>
      )}
      {text}
    </Button>
  );
}
