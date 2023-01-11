import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "components/styles/Header.module.css";

type PropType = {
  activeItemIndex: number;
};

export default function Header({ activeItemIndex }: PropType) {
  return (
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
  );
}
