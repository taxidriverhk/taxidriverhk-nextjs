import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "components/styles/Header.module.css";

type PropType = {
  activeItemIndex: number;
};

const NUM_HEADER_IMAGES: number = 3;

export default function Header({ activeItemIndex }: PropType) {
  const backgroundImageNumber: number =
    Math.floor(Math.random() * NUM_HEADER_IMAGES) + 1;
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className={styles["header-brand"]} href="/">
          Hong Kong Taxi Driver Workshop
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/csmaps" active={activeItemIndex === 0}>
            Counter Strike
          </Nav.Link>
          <Nav.Link href="/omsi" active={activeItemIndex === 1}>
            OMSI
          </Nav.Link>
          <Nav.Link href="/others" active={activeItemIndex === 2}>
            Personal Website
          </Nav.Link>
        </Nav>
      </Navbar>
      <div
        className={styles["header-image"]}
        style={{
          backgroundImage: `url(/header-${backgroundImageNumber}.jpg)`,
        }}
      />
    </>
  );
}
