import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";

import ImageCarousel from "components/ImageCarousel";
import Template from "components/Template";
import DownloadButton from "components/csmaps/DownloadButton";
import { Website } from "shared/config/website-config";
import type { ItemNotFoundResponse } from "shared/fetch/common";
import { getMapAsync } from "shared/fetch/csmaps";
import type { Map as GetMapResponse, MapItem } from "shared/types/cs-map-types";
import { CsMapsDataMapper, ReleaseStatus } from "shared/types/cs-map-types";

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
    updateDate,
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
          {status === ReleaseStatus.Released && (
            <tr>
              <td>Initial Release Date</td>
              <td>{releaseDate}</td>
            </tr>
          )}
          <tr>
            <td>Last Update Date</td>
            <td>{updateDate}</td>
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
            <td>
              {status === ReleaseStatus.InProgress ? "Progress" : "Download"}
            </td>
            <td>
              {status === ReleaseStatus.InProgress && (
                <>
                  <ProgressBar
                    now={progressPercentage}
                    label={`${progressPercentage}%`}
                  />
                </>
              )}
              {(() => {
                if (downloadLinks?.length === 1) {
                  return <DownloadButton link={downloadLinks[0]} />;
                }
                return downloadLinks?.map((downloadLink, index) => (
                  <>
                    <DownloadButton link={downloadLink} mirrorIndex={index} />{" "}
                  </>
                ));
              })()}
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

  const map = await getMapAsync(id);
  if ((map as ItemNotFoundResponse)?.notFound === true) {
    return {
      notFound: true,
    };
  }

  return {
    props: { map: CsMapsDataMapper.toMapItem(map as GetMapResponse) },
  };
}
