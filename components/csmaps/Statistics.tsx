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
    <Card bg="light" border="dark" className={styles["statistics-container"]}>
      <Card.Header>Statistics</Card.Header>
      <Card.Body>
        <ListGroup>
          {[
            {
              variant: "success",
              backgroundColor: "#166534",
              text: "Maps Released",
              count: num_released_maps,
            },
            {
              variant: "primary",
              backgroundColor: "#1e40af",
              text: "Work In Progress",
              count: num_in_progress_maps,
            },
            {
              variant: "dark",
              backgroundColor: "#991b1b",
              text: "No Longer Available",
              count: num_unavailable_maps,
            },
            {
              variant: "info",
              backgroundColor: "#92400e",
              text: "Tutorials Written",
              count: num_tutorials,
            },
          ].map(
            ({
              backgroundColor,
              variant,
              text,
              count,
            }: {
              backgroundColor: string;
              variant: string;
              text: string;
              count: number;
            }) => (
              <div key={text} className={styles["statistics-item"]}>
                <ListGroupItem
                  className="d-flex justify-content-between align-items-start"
                  variant={variant}
                  style={{
                    backgroundColor,
                  }}
                >
                  {text} <Badge bg="dark">{count}</Badge>
                </ListGroupItem>
              </div>
            ),
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
