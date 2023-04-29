import Container from "react-bootstrap/Container";

import Breadcrumb from "components/Breadcrumb";
import Header from "components/Header";
import styles from "components/styles/Template.module.css";
import type { Website } from "shared/config/website-config";

type PropType = {
  activeWebsite: Website;
  children: React.ReactNode;
  path: string;
  showBreadcrumb?: boolean;
};

export default function Template({
  activeWebsite,
  children,
  path,
  showBreadcrumb = true,
}: PropType) {
  return (
    <Container>
      <div className={styles["template-container"]}>
        <Header activeWebsite={activeWebsite} />
        {showBreadcrumb && <Breadcrumb path={path} />}
        <Container className={styles["template-content"]}>{children}</Container>
        <div className={styles["template-footer"]}>
          Created by Alex Leung &copy; 2023
        </div>
      </div>
    </Container>
  );
}
