import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "components/hkadbus2/styles/Template.module.css";

type PropType = {
  children: React.ReactNode;
  linkAs?: React.ElementType;
  locale?: string;
  onLocaleChange: (locale: string) => void;
  translationFunc: (key: string) => string;
};

const NUM_HEADER_IMAGES: number = 5;

export default function Template({
  children,
  linkAs,
  locale = "en-US",
  onLocaleChange,
  translationFunc: t,
}: PropType) {
  const backgroundImageNumber: number =
    Math.floor(Math.random() * NUM_HEADER_IMAGES) + 1;
  const LinkComponent = linkAs || "a";

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
          <Navbar.Brand as={LinkComponent} href="/hkadbus2">
            {t("title")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={LinkComponent} href="/hkadbus2/search">
                {t("search")}
              </Nav.Link>
              <Nav.Link as={LinkComponent} href="/hkadbus2/categories">
                {t("categories")}
              </Nav.Link>
              <Nav.Link as={LinkComponent} href="/hkadbus2/bus-models">
                {t("bus-models")}
              </Nav.Link>
              <Nav.Link as={LinkComponent} href="/hkadbus2/users">
                {t("user-list-link")}
              </Nav.Link>
            </Nav>
            <Nav variant="pills">
              <Nav.Link
                active={locale === "en-US"}
                onClick={() => onLocaleChange("en-US")}
              >
                Eng
              </Nav.Link>
              <Nav.Link
                active={locale === "zh-HK"}
                onClick={() => onLocaleChange("zh-HK")}
              >
                中
              </Nav.Link>
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
