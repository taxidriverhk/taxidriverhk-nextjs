import Badge from "react-bootstrap/Badge";
import { GameVersion, gameVersionBadgeColor } from "shared/types/cs-map-types";

type PropType = {
  initialDate: string;
  lastUpdateDate: string;
  targetGameVersion: GameVersion;
};

export default function ItemBadgeGroup({
  initialDate,
  lastUpdateDate,
  targetGameVersion,
}: PropType) {
  return (
    <>
      <Badge bg="dark">{initialDate}</Badge>{" "}
      {initialDate !== lastUpdateDate && (
        <>
          <Badge bg="danger">[Updated] {lastUpdateDate}</Badge>{" "}
        </>
      )}
      <Badge bg={gameVersionBadgeColor[targetGameVersion]}>
        {targetGameVersion}
      </Badge>
    </>
  );
}
