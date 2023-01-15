import classNames from "classnames";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

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
          <ListGroup.Item
            as={Link}
            className={classNames(
              styles["section-button"],
              styles["section-button-urban-taxi"]
            )}
            href="csmaps"
          >
            Counter Strike Maps
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            className={classNames(
              styles["section-button"],
              styles["section-button-nt-taxi"]
            )}
            href="omsi"
          >
            OMSI / Bus Driving Simulator
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            className={classNames(
              styles["section-button"],
              styles["section-button-lantau-taxi"]
            )}
            href="others"
          >
            Personal Website
          </ListGroup.Item>
          {/* Footer */}
          <ListGroup.Item className={styles["section-footer"]} disabled>
            Created by Alex Leung &copy; 2023
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
}
