import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Markdown from "react-markdown";

import Template from "components/Template";
import { Website } from "shared/config/website-config";
import type {
  Tutorial as GetTutorialResponse,
  MapTutorial,
} from "shared/types/cs-map-types";
import {
  CsMapsDataMapper,
  GameVersion,
  gameVersionBadgeColor,
} from "shared/types/cs-map-types";

import styles from "components/styles/Tutorial.module.css";
import { ItemNotFoundResponse } from "shared/fetch/common";
import { getTutorialAsync } from "shared/fetch/csmaps";

type PropType = {
  tutorial: MapTutorial;
};

export default function CsMapTutorial({
  tutorial: { content, creationDate, lastUpdateDate, title, targetGameVersion },
}: PropType) {
  const router = useRouter();
  const { asPath: currentPath } = router;

  useEffect(() => {
    document.title = `${title} - Counter-Strike${
      targetGameVersion === GameVersion.COUNTER_STRIKE_2 ? " 2" : ""
    } Map Making Tutorials`;
  }, [targetGameVersion, title]);

  return (
    <Template activeWebsite={Website.CSMAPS} path={currentPath}>
      <h3>{title}</h3>
      <div className={styles["tutorial-metadata"]}>
        <span>
          <strong>Initial Creation Date:</strong> {creationDate}
        </span>
        <span>
          <strong>Last Updated Date:</strong> {lastUpdateDate}
        </span>
        <span>
          <strong>Target Game Version:</strong>{" "}
          <Badge bg={gameVersionBadgeColor[targetGameVersion]}>
            {targetGameVersion}
          </Badge>
        </span>
      </div>
      <Card>
        <Card.Body className={styles["tutorial-content"]}>
          <Markdown>{content}</Markdown>
        </Card.Body>
      </Card>
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

  const tutorial = await getTutorialAsync(id);
  if ((tutorial as ItemNotFoundResponse)?.notFound === true) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tutorial: CsMapsDataMapper.toTutorial(tutorial as GetTutorialResponse),
    },
  };
}
