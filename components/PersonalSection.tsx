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
  year?: string;
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
          {items.map(({ description, href, icon, title, year }) => (
            <ListGroup.Item
              action
              className={styles["section-block"]}
              href={href}
              key={title}
            >
              <div className={styles["section-title"]}>
                <FontAwesomeIcon
                  className={styles["section-icon"]}
                  icon={icon}
                />
                {title}
              </div>
              {year && <div className={styles["section-time"]}>{year}</div>}
              <div className={styles["section-description"]}>{description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
