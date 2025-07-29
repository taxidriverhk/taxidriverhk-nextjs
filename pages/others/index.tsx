import {
  faGithub,
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
import { Website } from "shared/config/website-config";

export default function Personal() {
  const router = useRouter();
  const { asPath: currentPath } = router;
  return (
    <Template activeWebsite={Website.PERSONAL} path={currentPath}>
      <PersonalSection
        headerTitle="Portfolio"
        items={[
          {
            href: "https://www.linkedin.com/in/alexkhleung/",
            icon: faLinkedin,
            title: "LinkedIn Profile",
          },
          {
            description:
              "Collection of personal code written during school and spare time.",
            href: "https://github.com/taxidriverhk/",
            icon: faGithub,
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
            year: "April 2020",
          },
          {
            description:
              "A simple React page for looking up vehicle inventory of various brands within the U.S. Some of the APIs may not work properly.",
            href: `${currentPath}/vehicle-inventory-lookup`,
            icon: faReact,
            title: "Vehicle Inventory Lookup",
            year: "May 2017",
          },
          {
            description:
              "A simple Javascript library to shrink a photo smoothly.",
            href: "legacy/smooth-shrink",
            icon: faJs,
            title: "smooth-shrink.js",
            year: "January 2015",
          },
          {
            description:
              "The first dynamic web application for creating PC combo list, created using PHP (some pages may not work properly).",
            href: "legacy/diyer",
            icon: faPhp,
            title: "Computer DIY College",
            year: "July 2008",
          },
          {
            description:
              "The very first website created using Microsoft FrontPage.",
            href: "legacy/cityalan465/o5.htm",
            icon: faHtml5,
            title: "Advertised Bus Photo Station",
            year: "August 2003",
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
