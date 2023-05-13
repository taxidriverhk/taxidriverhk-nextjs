import type { ReactNode } from "react";
import { Fragment } from "react";
import BootstrapBreadcrumb from "react-bootstrap/Breadcrumb";

import styles from "components/styles/Breadcrumb.module.css";

type PropType = {
  path: string;
};

type PathTitle = {
  children?: Array<PathTitle>;
  prefix: string;
  title: string;
};

const PATH_TITLES = {
  prefix: "",
  title: "Home",
  children: [
    {
      prefix: "/csmaps",
      title: "Counter Strike",
      children: [{ prefix: "/maps", title: "Map Details" }],
    },
    {
      prefix: "/others",
      title: "Personal Website",
      children: [
        {
          prefix: "/pages",
          title: "Pages",
          children: [
            {
              prefix: "/apple-daily",
              title: "Hong Kong Apple Daily Videos Archive",
            },
          ],
        },
        { prefix: "/books", title: "Books" },
        {
          prefix: "/vehicle-inventory-lookup",
          title: "Vehicle Inventory Lookup",
        },
      ],
    },
  ],
};

function pathPrefixMatches(path: string, prefix: string): boolean {
  // Allow trailing slash and other subpaths
  return new RegExp(`${prefix}\/*.?`, "i").test(path);
}

function renderBreadcrumbItems(
  path: string,
  { children = [], prefix, title }: PathTitle
): ReactNode {
  return (
    <Fragment key={path}>
      {pathPrefixMatches(path, prefix) && (
        <BootstrapBreadcrumb.Item
          active={prefix === path || children.length === 0}
          href={prefix.length > 0 ? prefix : "/"}
          key={prefix}
        >
          {title}
        </BootstrapBreadcrumb.Item>
      )}
      {children.map((child) =>
        renderBreadcrumbItems(path, {
          ...child,
          prefix: `${prefix}${child.prefix}`,
        })
      )}
    </Fragment>
  );
}

export default function Breadcrumb({ path }: PropType) {
  return (
    <BootstrapBreadcrumb className={styles["breadcrumb-container"]}>
      {renderBreadcrumbItems(path, PATH_TITLES)}
    </BootstrapBreadcrumb>
  );
}
