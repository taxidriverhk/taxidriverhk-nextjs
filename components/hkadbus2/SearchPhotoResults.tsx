import { useMemo } from "react";
import Button from "react-bootstrap/Button";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import { PhotoColor } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import type { SearchPhotoResult } from "shared/types/hkadbus2-types";
import { BusCompany } from "shared/types/hkadbus2-types";

type PropType = {
  isFetching: boolean;
  isLoadMoreShown: boolean;
  onLoadMore: () => void;
  results: Array<SearchPhotoResult>;
};

const busCompanyColorMap = {
  [BusCompany.KMB]: PhotoColor.Red,
  [BusCompany.CTB]: PhotoColor.Yellow,
  [BusCompany.CMB]: PhotoColor.LightBlue,
  [BusCompany.NWFB]: PhotoColor.Green,
};

export default function SearchPhotoResults({ onLoadMore, results }: PropType) {
  const photoCards: Array<PhotoCardPropType> = useMemo(
    () =>
      results.map(
        ({
          busCompany,
          fleetPrefix,
          fleetNumber,
          licensePlateNumber,
          photoId,
          thumbnail,
        }) => ({
          backgroundColor: busCompanyColorMap[busCompany],
          href: `photos/${photoId}`,
          photo: thumbnail,
          title: `${fleetPrefix}${fleetNumber}`,
          subtitle: licensePlateNumber,
        })
      ),
    [results]
  );

  return (
    <>
      <PhotoCardList photos={photoCards} />
      <Button onClick={onLoadMore}>Load More</Button>
    </>
  );
}
