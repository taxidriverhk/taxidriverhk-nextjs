import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "components/hkadbus2/styles/Template.module.css";

type PropType = {
  children: React.ReactNode;
  path: string;
};

const NUM_HEADER_IMAGES: number = 5;

export default function Template({ children, path }: PropType) {
  const backgroundImageNumber: number =
    Math.floor(Math.random() * NUM_HEADER_IMAGES) + 1;
  return (
    <Container>
      <div
        className={styles["template-header-image"]}
        style={{
          backgroundImage: `url(/hkadbus2/header-${backgroundImageNumber}.jpg)`,
        }}
      />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            Hong Kong Advertised Bus Photo Database v2.5
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Categories</Nav.Link>
              <Nav.Link>Bus Models</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>Eng</Nav.Link>
              <Nav.Link>中</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={styles["template-body"]}>{children}</div>
      <div className={styles["template-footer"]}>
        Created by Alex Leung &copy; 2023
      </div>
    </Container>
  );
}
