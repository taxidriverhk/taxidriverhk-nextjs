import React from "react";

import Container from "react-bootstrap/Container";

import Header from "components/Header";
import styles from "components/styles/Template.module.css";

type PropType = {
  activeItemIndex: number;
  children: React.ReactNode;
};

export default function Template({ activeItemIndex, children }: PropType) {
  return (
    <Container>
      <div className={styles["template-container"]}>
        <Header activeItemIndex={activeItemIndex} />
        <Container className={styles["template-content"]}>{children}</Container>
        <div className={styles["template-footer"]}>
          Created by Alex Leung &copy; 2021
        </div>
      </div>
    </Container>
  );
}
