import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";

import ImageCarousel from "components/ImageCarousel";
import Template from "components/Template";
import { mapItems } from "shared/config/cs-map-config";
import { Website } from "shared/config/website-config";
import type { MapItem } from "shared/types/cs-map-types";
import { ReleaseStatus } from "shared/types/cs-map-types";

type PropType = {
  map: MapItem;
};

export default function CsMapDetails({
  map: {
    downloadLinks,
    fullName,
    images,
    maxPlayers,
    name,
    progressPercentage,
    releaseDate,
    status,
    targetGameVersion,
    version,
  },
}: PropType) {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.CSMAPS} path={currentPath}>
      <h3>{name}</h3>
      {images && <ImageCarousel images={images} />}
      <Table bordered>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Map Name</td>
            <td>{fullName}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{version}</td>
          </tr>
          <tr>
            <td>Release Date/Last Updated Date</td>
            <td>{releaseDate}</td>
          </tr>
          <tr>
            <td>Maximum Players Allowed</td>
            <td>{`${maxPlayers} (${maxPlayers / 2} per team)`}</td>
          </tr>
          <tr>
            <td>Target Game Version</td>
            <td>{targetGameVersion}</td>
          </tr>
          <tr>
            <td>Download</td>
            <td>
              {status === ReleaseStatus.InProgress && (
                <>
                  Coming Soon
                  <ProgressBar
                    now={progressPercentage}
                    label={`${progressPercentage}%`}
                  />
                </>
              )}
              {downloadLinks?.map((downloadLink, index) => (
                <>
                  <Button href={downloadLink}>{`Download (Mirror ${
                    index + 1
                  })`}</Button>{" "}
                </>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </Template>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const id = context.params?.id;
  if (id == null || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }

  let map = null;
  const idNumber = parseInt(id, 10);
  if (Number.isNaN(idNumber)) {
    map = mapItems.find((mapItem) => mapItem.name === id.toLowerCase());
  } else {
    map = mapItems.find((mapItem) => mapItem.id === idNumber);
  }

  if (map == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { map },
  };
}
