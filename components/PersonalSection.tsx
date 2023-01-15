import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "components/styles/PersonalSection.module.css";

type PersonalSectionItem = {
  description?: string;
  href: string;
  icon: IconProp;
  title: string;
};

type PropType = {
  headerTitle: string;
  items: Array<PersonalSectionItem>;
};

export default function PersonalSection({ headerTitle, items }: PropType) {
  return (
    <Card bg="light" border="dark" className={styles["section-container"]}>
      <Card.Header>{headerTitle}</Card.Header>
      <Card.Body>
        <ListGroup>
          {items.map(({ description, href, icon, title }) => (
            <ListGroup.Item
              action
              className={styles["section-block"]}
              href={href}
              key={title}
            >
              <FontAwesomeIcon className={styles["section-icon"]} icon={icon} />
              {title}
              <div className={styles["section-description"]}>{description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
