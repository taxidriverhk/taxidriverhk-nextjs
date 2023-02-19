import { useMemo } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import type { PhotoCardPropType } from "components/hkadbus2/PhotoCard";
import { PhotoColor } from "components/hkadbus2/PhotoCard";
import PhotoCardList from "components/hkadbus2/PhotoCardList";
import type { SearchPhotoResult } from "shared/types/hkadbus2-types";
import { BusCompany } from "shared/types/hkadbus2-types";

import styles from "components/hkadbus2/styles/SearchPhoto.module.css";

type PropType = {
  isFetching: boolean;
  isLoadMoreDisabled: boolean;
  isLoadMoreShown: boolean;
  onLoadMore: () => void;
  results: Array<SearchPhotoResult>;
  total: number;
  translationFunc: (key: string, params?: any) => string;
};

const busCompanyColorMap = {
  [BusCompany.KMB]: PhotoColor.Red,
  [BusCompany.CTB]: PhotoColor.Yellow,
  [BusCompany.CMB]: PhotoColor.LightBlue,
  [BusCompany.NWFB]: PhotoColor.Green,
};

export default function SearchPhotoResults({
  isLoadMoreShown,
  isLoadMoreDisabled,
  onLoadMore,
  results,
  total,
  translationFunc: t,
}: PropType) {
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
      {photoCards.length > 0 ? (
        <>
          <PhotoCardList photos={photoCards} />
          <Card>
            <Card.Body>
              {t("search-results-count", {
                loaded: photoCards.length,
                total,
              })}
            </Card.Body>
          </Card>
        </>
      ) : (
        <Card>
          <Card.Body>{t("search-results-no-results")}</Card.Body>
        </Card>
      )}
      {isLoadMoreShown && (
        <div
          className={styles["search-photo-results-load-more-button-container"]}
        >
          <Button
            disabled={isLoadMoreDisabled}
            variant="outline-secondary"
            onClick={onLoadMore}
          >
            {t("search-results-load-more")}
          </Button>
        </div>
      )}
    </>
  );
}
