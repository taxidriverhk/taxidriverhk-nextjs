import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import { buildPhotoSearchUrl } from "shared/query/hkadbus2-query-builder";
import type { Photo } from "shared/types/hkadbus2-types";

import styles from "components/hkadbus2/styles/PhotoDetails.module.css";

type PropType = {
  photo: Photo;
  translationFunc: (
    key: string,
    params?: { [key: string]: string | number }
  ) => string;
};

export default function PhotoDetails({
  photo: {
    advertisement,
    advertisementId,
    busCompany,
    busModel,
    busModelId,
    category,
    categoryId,
    fleetNumber,
    fleetPrefix,
    image,
    licensePlateNumber,
    routeNumber,
    uploadedDate,
    username,
  },
  translationFunc: t,
}: PropType) {
  return (
    <Container>
      <Row>
        <Image
          alt={licensePlateNumber}
          className={styles["photo-details-image"]}
          src={image}
        />
      </Row>
      <Row>
        <Table className={styles["photo-details-table"]} bordered hover>
          <tbody>
            <tr>
              <td colSpan={3}>{t("uploaded-date", { uploadedDate })}</td>
            </tr>
            <tr>
              <td colSpan={3}>
                {t("uploaded-by")}{" "}
                <a
                  href={`../${buildPhotoSearchUrl({ uploaderName: username })}`}
                >
                  {username}
                </a>
              </td>
            </tr>
            <tr>
              <td>{t("category")}</td>
              <td>{category}</td>
              <td>
                <Button href={`../categories/${categoryId}`} variant="info">
                  {t("related-photos", { attribute: t("category") })}
                </Button>
              </td>
            </tr>
            <tr>
              <td>{t("advertisement")}</td>
              <td>{advertisement}</td>
              <td>
                <Button
                  href={`../${buildPhotoSearchUrl({ advertisementId })}`}
                  variant="info"
                >
                  {t("related-photos", { attribute: t("advertisement") })}
                </Button>
              </td>
            </tr>
            <tr>
              <td>{t("model")}</td>
              <td>{busModel}</td>
              <td>
                <Button
                  href={`../${buildPhotoSearchUrl({ busModelId })}`}
                  variant="info"
                >
                  {t("related-photos", { attribute: t("model") })}
                </Button>
              </td>
            </tr>
            <tr>
              <td>{t("fleet-number")}</td>
              <td>
                {fleetPrefix}
                {fleetNumber}
              </td>
              <td>
                <Button
                  href={`../${buildPhotoSearchUrl({ fleetPrefix })}`}
                  variant="info"
                >
                  {t("related-photos", { attribute: t("fleet") })}
                </Button>
              </td>
            </tr>
            <tr>
              <td>{t("license-plate-number")}</td>
              <td>
                <h5>
                  <Badge bg="warning" text="dark">
                    {licensePlateNumber.substring(0, 2)}{" "}
                    {licensePlateNumber.substring(2)}
                  </Badge>
                </h5>
              </td>
              <td>
                <Button
                  href={`../${buildPhotoSearchUrl({ licensePlateNumber })}`}
                  variant="info"
                >
                  {t("related-photos", { attribute: t("bus") })}
                </Button>
              </td>
            </tr>
            <tr>
              <td>{t("bus-company")}</td>
              <td colSpan={2}>{busCompany}</td>
            </tr>
            <tr>
              <td>{t("route-number")}</td>
              <td>{routeNumber}</td>
              <td>
                <Button
                  href={`../${buildPhotoSearchUrl({
                    busRouteNumber: routeNumber,
                  })}`}
                  variant="info"
                >
                  {t("related-photos", { attribute: t("route-number") })}
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
