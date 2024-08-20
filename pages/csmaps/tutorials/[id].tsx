import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";

import Template from "components/Template";
import { Website } from "shared/config/website-config";
import type {
  Tutorial as GetTutorialResponse,
  HeadingHierarchy,
  MapTutorial,
} from "shared/types/cs-map-types";
import {
  CsMapsDataMapper,
  GameVersion,
  gameVersionBadgeColor,
} from "shared/types/cs-map-types";

import TutorialHeadingHierarchy from "components/csmaps/TutorialHeadingHierarchy";
import styles from "components/styles/Tutorial.module.css";
import { ItemNotFoundResponse } from "shared/fetch/common";
import { getTutorialAsync } from "shared/fetch/csmaps";
import { getHeadingHierarchy } from "shared/util/cs-map-util";

type PropType = {
  hierarchy: HeadingHierarchy;
  tutorial: MapTutorial;
};

export default function CsMapTutorial({
  hierarchy,
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
      <TutorialHeadingHierarchy hierarchy={hierarchy} />
      <Card>
        <Card.Body className={styles["tutorial-content"]}>
          <Markdown rehypePlugins={[rehypeSlug]}>{content}</Markdown>
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

  const tutorialEntity = await getTutorialAsync(id);
  if ((tutorialEntity as ItemNotFoundResponse)?.notFound === true) {
    return {
      notFound: true,
    };
  }

  const tutorial = CsMapsDataMapper.toTutorial(
    tutorialEntity as GetTutorialResponse
  );
  const { content } = tutorial;
  const hierarchy = getHeadingHierarchy(content);

  return {
    props: {
      hierarchy,
      tutorial,
    },
  };
}
