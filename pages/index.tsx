import classNames from "classnames";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { websites } from "shared/config/website-config";

import styles from "shared/styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <div className={styles["section-container"]}>
        <ListGroup className={styles["section-group"]}>
          {/* Header */}
          <ListGroup.Item className={styles["section-header"]} disabled>
            Hong Kong Taxi Driver Workshop
          </ListGroup.Item>
          {/* Sections */}
          {websites.map(({ buttonClassName, href, name, website }) => (
            <ListGroup.Item
              as={Link}
              className={classNames(
                styles["section-button"],
                styles[buttonClassName]
              )}
              href={href}
              key={website}
            >
              {name}
            </ListGroup.Item>
          ))}
          {/* Footer */}
          <ListGroup.Item className={styles["section-footer"]} disabled>
            Created by Alex Leung &copy; 2023
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
}
