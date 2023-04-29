import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import type { Website } from "shared/config/website-config";
import { websites } from "shared/config/website-config";

import styles from "components/styles/Header.module.css";

type PropType = {
  activeWebsite: Website;
};

const NUM_HEADER_IMAGES: number = 3;

export default function Header({ activeWebsite }: PropType) {
  const backgroundImageNumber: number =
    Math.floor(Math.random() * NUM_HEADER_IMAGES) + 1;
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className={styles["header-brand"]} href="/">
          Hong Kong Taxi Driver Workshop
        </Navbar.Brand>
        <Nav>
          {websites.map(({ href, website, shortName }) => (
            <Nav.Link
              active={activeWebsite === website}
              href={`/${href}`}
              key={website}
            >
              {shortName}
            </Nav.Link>
          ))}
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
