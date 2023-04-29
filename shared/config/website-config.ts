export enum Website {
  CSMAPS = 0,
  OMSI = 1,
  PERSONAL = 2,
}

export type WebsiteConfig = {
  buttonClassName: string;
  href: string;
  name: string;
  shortName: string;
  website: Website;
};

export const websites: Array<WebsiteConfig> = [
  {
    buttonClassName: "section-button-urban-taxi",
    href: "csmaps",
    name: "Counter Strike Maps",
    shortName: "Counter Strike",
    website: Website.CSMAPS,
  },
  {
    buttonClassName: "section-button-nt-taxi",
    href: "omsi",
    name: "OMSI / Bus Driving Simulator",
    shortName: "OMSI",
    website: Website.OMSI,
  },
  {
    buttonClassName: "section-button-lantau-taxi",
    href: "others",
    name: "Personal Website",
    shortName: "Personal",
    website: Website.PERSONAL,
  },
];
