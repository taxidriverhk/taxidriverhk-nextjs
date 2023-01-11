import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import styles from "shared/styles/Personal.module.css";
import Template from "components/Template";

export default function Personal() {
  return (
    <Template activeItemIndex={2}>
      <Card bg="light" border="primary" className={styles["section-container"]}>
        <Card.Header>Profile</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item action href="resume.pdf">
              Resume/CV
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card bg="light" border="warning" className={styles["section-container"]}>
        <Card.Header>Projects</Card.Header>
        <Card.Body></Card.Body>
      </Card>
      <Card bg="light" border="secondary">
        <Card.Header>Others</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </Template>
  );
}
