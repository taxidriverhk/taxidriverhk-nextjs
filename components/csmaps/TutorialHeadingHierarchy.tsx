import { Accordion } from "react-bootstrap";
import { HeadingHierarchy } from "shared/types/cs-map-types";

import styles from "components/styles/Tutorial.module.css";

type PropType = {
  hierarchy: HeadingHierarchy;
};

export default function TutorialHeadingHierarchy({ hierarchy }: PropType) {
  return (
    <Accordion
      defaultActiveKey="0"
      className={styles["heading-hierarchy-container"]}
    >
      <Accordion.Item eventKey="0" className={styles["heading-hierarchy"]}>
        <Accordion.Header className={styles["heading-hierarchy-header"]}>
          Contents
        </Accordion.Header>
        <Accordion.Body className={styles["heading-hierarchy-body"]}>
          <HierarchyItems hierarchyNodes={hierarchy.children} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function HierarchyItems({
  hierarchyNodes,
}: {
  hierarchyNodes: Array<HeadingHierarchy>;
}) {
  return (
    <ul>
      {hierarchyNodes.map(({ title, id, children }) => (
        <li key={id}>
          <a href={`#${id}`}>{title}</a>
          {children.length > 0 && <HierarchyItems hierarchyNodes={children} />}
        </li>
      ))}
    </ul>
  );
}
