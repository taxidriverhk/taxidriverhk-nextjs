import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import InsertPhotoForm, {
  TypeaheadOptionItems,
} from "components/hkadbus2/InsertPhotoForm";
import { useRouter } from "next/router";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import {
  fetchGetEntityOptions,
  insertPhotoFromClientSide,
  isAuthorizedToInsertPhotos,
} from "shared/fetch/hkadbus2";
import {
  PutPhotoRequest,
  TypeaheadOptionType,
} from "shared/types/hkadbus2-types";

type PropType = {
  apiKey?: string;
  photoId?: number | null;
  typeaheadOptions?: {
    [entityType: string]: TypeaheadOptionItems;
  };
  error?: string;
};

export default function HKAdbus2AdminHome({
  apiKey,
  photoId,
  typeaheadOptions,
  error: unauthorizedError,
}: PropType) {
  const router = useRouter();
  const { pathname } = router;
  const [insertionError, setInsertionError] = useState<Error | null>(null);

  if (apiKey == null || typeaheadOptions == null || unauthorizedError != null) {
    return (
      <Alert variant="danger">
        You are not authorized to access this page.
      </Alert>
    );
  }

  const handleSubmit = async (payload: PutPhotoRequest) => {
    // Submit the photo from the client side, so that in case of failure
    // the inputs can still be kept
    try {
      const insertedPhotoId = await insertPhotoFromClientSide(apiKey, payload);
      // Refresh the page with photo ID shown (which refreshes the typeahead options upon successful insertion)
      router.push({
        pathname,
        query: {
          apiKey,
          photoId: insertedPhotoId,
        },
      });
    } catch (error) {
      setInsertionError(error as Error);
    }
  };

  return (
    <Container>
      <Row
        className="align-items-center"
        style={{
          marginTop: "32px",
          marginLeft: "15vh",
          width: "80vh",
        }}
      >
        <Col>
          <InsertPhotoForm
            apiKey={apiKey}
            error={insertionError}
            photoId={photoId ?? null}
            typeaheadOptions={typeaheadOptions}
            onSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PropType>> {
  const { query } = context;
  const { apiKey, photoId } = query;
  if (apiKey == null || Array.isArray(apiKey)) {
    return handleUnauthorized(context);
  }

  const isAuthorized = await isAuthorizedToInsertPhotos(apiKey);
  if (!isAuthorized) {
    return handleUnauthorized(context);
  }

  const typeaheadOptionList = await Promise.all(
    Object.values(TypeaheadOptionType)
      .map((entityType) => [
        fetchGetEntityOptions(entityType, "en_us"),
        fetchGetEntityOptions(entityType, "zh_hk"),
      ])
      .flat()
  );

  const typeaheadOptions: {
    [entityType: string]: TypeaheadOptionItems;
  } = {};
  for (let i = 0; i < typeaheadOptionList.length; i += 2) {
    const { entityType, options: enOptions } = typeaheadOptionList[i];
    const { options: zhOptions } = typeaheadOptionList[i + 1];
    typeaheadOptions[entityType.toString()] = {
      en_us: enOptions,
      zh_hk: zhOptions,
    };
  }

  const photoIdNum =
    photoId != null && !Array.isArray(photoId) ? parseInt(photoId) : null;

  return {
    props: {
      apiKey,
      photoId: photoIdNum,
      typeaheadOptions,
    },
  };
}

function handleUnauthorized(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<PropType> {
  context.res.statusCode = 401;
  return {
    props: {
      error: "unauthorized",
    },
  };
}
