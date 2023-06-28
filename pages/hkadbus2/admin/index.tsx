import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import InsertPhotoForm, {
  TypeaheadOptionItems,
} from "components/hkadbus2/InsertPhotoForm";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import {
  fetchGetEntityOptions,
  isAuthorizedToInsertPhotos,
} from "shared/fetch/hkadbus2";
import {
  PutPhotoRequest,
  TypeaheadOptionType,
} from "shared/types/hkadbus2-types";

type PropType = {
  apiKey?: string;
  typeaheadOptions?: {
    [entityType: string]: TypeaheadOptionItems;
  };
  error?: string;
};

export default function HKAdbus2AdminHome({
  apiKey,
  typeaheadOptions,
  error,
}: PropType) {
  if (apiKey == null || typeaheadOptions == null || error != null) {
    return (
      <Alert variant="danger">
        You are not authorized to access this page.
      </Alert>
    );
  }

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
            typeaheadOptions={typeaheadOptions}
            onSubmit={(payload: PutPhotoRequest) => {}}
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
  const { apiKey } = query;
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

  return {
    props: {
      apiKey,
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
