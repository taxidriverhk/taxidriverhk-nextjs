import { HeadingHierarchy } from "shared/types/cs-map-types";

export function getHeadingHierarchy(content: string): HeadingHierarchy {
  const headings = content.split("\n").filter((line) => line.startsWith("#"));

  const stack = [];
  const root: HeadingHierarchy = {
    id: "",
    level: 0,
    title: "",
    children: [],
  };
  stack.push(root);

  for (const heading of headings) {
    let topNode = stack[stack.length - 1];
    const level = getHeadingLevel(heading);
    const title = getHeadingTitle(heading);
    const id = getHeadingId(title);

    const childNode: HeadingHierarchy = {
      id,
      level,
      title,
      children: [],
    };

    while (topNode.level !== 0 && topNode.level >= level) {
      stack.pop();
      topNode = stack[stack.length - 1];
    }
    topNode.children.push(childNode);
    stack.push(childNode);
  }

  return root;
}

function getHeadingId(title: string): string {
  return title.replace(/[\s\(\)/]/g, "-").toLowerCase();
}

function getHeadingLevel(heading: string): number {
  const hashes = heading.split(" ")[0];
  return hashes.length;
}

function getHeadingTitle(heading: string): string {
  return heading.split(" ").splice(1).join(" ");
}
