import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import ImageCarousel from "components/ImageCarousel";
import Template from "components/Template";
import type { MapItem } from "shared/config/csMapData";
import { mapItems } from "shared/config/csMapData";

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
    releaseDate,
    version,
  },
}: PropType) {
  return (
    <Template activeItemIndex={0}>
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
            <td>Release Date</td>
            <td>{releaseDate}</td>
          </tr>
          <tr>
            <td>Maximum Players Allowed</td>
            <td>{`${maxPlayers} (${maxPlayers / 2} per team)`}</td>
          </tr>
          <tr>
            <td>Download</td>
            <td>
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

  const idNumber = parseInt(id, 10);
  if (Number.isNaN(idNumber)) {
    return {
      notFound: true,
    };
  }

  const map = mapItems.find((mapItem) => mapItem.id === idNumber);
  if (map == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { map },
  };
}
