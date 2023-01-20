import {
  faBitbucket,
  faHtml5,
  faJs,
  faLinkedin,
  faPhp,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faCamera,
  faSolarPanel,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import PersonalSection from "components/PersonalSection";
import Template from "components/Template";

export default function Personal() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeItemIndex={2}>
      <PersonalSection
        headerTitle="Portfolio"
        items={[
          {
            href: "https://www.linkedin.com/in/alexkhleung/",
            icon: faLinkedin,
            title: "LinkedIn Profile",
          },
          {
            href: "https://bitbucket.org/taxidriverhk/",
            icon: faBitbucket,
            title: "Code Repositories",
          },
          {
            description: "Photos taken by me for travel, life and model cars.",
            href: "https://www.flickr.com/photos/10588039@N08/albums/with/72177720299204839",
            icon: faCamera,
            title: "Photography",
          },
        ]}
      />
      <PersonalSection
        headerTitle="Projects"
        items={[
          {
            description:
              "A static website written in React with NextJS for showcasing bus photos.",
            href: "hkadbus2",
            icon: faReact,
            title: "Hong Kong Advertised Bus Photo Database v2.5",
          },
          {
            description:
              "A simple React page for looking up vehicle inventory of various brands within the U.S.",
            href: `${currentPath}/vehicle-inventory-lookup`,
            icon: faReact,
            title: "Vehicle Inventory Lookup",
          },
          {
            description:
              "A simple Javascript library to shrink a photo smoothly.",
            href: "legacy/smooth-shrink",
            icon: faJs,
            title: "smooth-shrink.js",
          },
          {
            description:
              "The first dynamic web application for creating PC combo list, created in 2008 using PHP (some pages may not work properly).",
            href: "legacy/diyer",
            icon: faPhp,
            title: "Computer DIY College",
          },
          {
            description:
              "The very first website created back in 2003 using Microsoft FrontPage.",
            href: "legacy/cityalan465/o5.htm",
            icon: faHtml5,
            title: "Advertised Bus Photo Station",
          },
        ]}
      />
      <PersonalSection
        headerTitle="Others"
        items={[
          {
            description: "A collection of other pages.",
            href: `${currentPath}/pages`,
            icon: faSolarPanel,
            title: "Other Pages",
          },
          {
            description: "Books that I have read or am reading.",
            href: `${currentPath}/books`,
            icon: faBook,
            title: "Books",
          },
        ]}
      />
    </Template>
  );
}
