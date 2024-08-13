import Card from "react-bootstrap/Card";

import { Statistics as StatisticsType } from "shared/types/cs-map-types";

import styles from "components/styles/MapSection.module.css";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";

type PropType = {
  statistics: StatisticsType;
};

export default function Statistics({
  statistics: {
    num_released_maps,
    num_in_progress_maps,
    num_unavailable_maps,
    num_tutorials,
  },
}: PropType) {
  return (
    <Card bg="light" border="dark" className={styles["section-container"]}>
      <Card.Header>Statistics</Card.Header>
      <Card.Body>
        <ListGroup>
          {[
            {
              variant: "success",
              text: "Maps Released",
              count: num_released_maps,
            },
            {
              variant: "primary",
              text: "Work In Progress",
              count: num_in_progress_maps,
            },
            {
              variant: "dark",
              text: "No Longer Available",
              count: num_unavailable_maps,
            },
            {
              variant: "info",
              text: "Tutorials Written",
              count: num_tutorials,
            },
          ].map(
            ({
              variant,
              text,
              count,
            }: {
              variant: string;
              text: string;
              count: number;
            }) => (
              <ListGroupItem
                className="d-flex justify-content-between align-items-start"
                key={text}
                variant={variant}
              >
                {text} <Badge bg="dark">{count}</Badge>
              </ListGroupItem>
            )
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
