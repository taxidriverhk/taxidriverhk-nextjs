export enum ReleaseStatus {
  Released = 0,
  InProgress,
  Unavailable,
}

export const releaseStatusDisplayText = {
  [ReleaseStatus.InProgress]: "In Progress",
  [ReleaseStatus.Unavailable]: "Unavailable",
};

export type MapCategory = {
  abbr: string;
  id: number;
  fullName: string;
};

export type MapItem = {
  categoryId: number;
  downloadLinks?: Array<string>;
  fullName: string;
  icon: string;
  id: number;
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  maxPlayers: number;
  name: string;
  progressPercentage?: number;
  version: string;
  releaseDate: string;
  status: ReleaseStatus;
};

export const mapCategories: Array<MapCategory> = [
  {
    id: 1,
    fullName: "Assassination",
    abbr: "AS",
  },
  {
    id: 2,
    fullName: "Hostage Rescue",
    abbr: "CS",
  },
  {
    id: 3,
    fullName: "Bomb Defuse",
    abbr: "DE",
  },
  {
    id: 4,
    fullName: "Deathmatch",
    abbr: "DM",
  },
  {
    id: 5,
    fullName: "Terrorist Escape",
    abbr: "ES",
  },
  {
    id: 6,
    fullName: "Knife Only",
    abbr: "KA",
  },
];

export const mapItems: Array<MapItem> = [
  {
    id: -1,
    categoryId: 1,
    name: "as_taxi_tsimshatsui",
    fullName: "Tsim Sha Tsui Ferry Pier",
    version: "0.8 (Beta Version)",
    releaseDate: "2007-09-28",
    status: ReleaseStatus.Unavailable,
    icon: "/csmaps/icon1.jpg",
    maxPlayers: 10,
    images: [],
    downloadLinks: [],
  },
  {
    id: 1,
    categoryId: 1,
    name: "as_taxi_tsimshatsui2",
    fullName: "Tsim Sha Tsui Ferry Pier 2",
    version: "1.0 (Final Version)",
    releaseDate: "2008-05-29",
    status: ReleaseStatus.Released,
    icon: "/csmaps/icon2.jpg",
    maxPlayers: 16,
    images: [
      {
        url: "/csmaps/map1_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map1_2.jpg",
        caption: "Star Ferry",
      },
      {
        url: "/csmaps/map1_3.jpg",
        caption: "VIP Escape Point",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heKkPL",
      "https://www.dropbox.com/s/aqye29rfgl2vfzh/as_taxi_tsimshatsui2.rar?dl=0",
    ],
  },
  {
    id: 2,
    categoryId: 1,
    name: "as_taxi_tsimshatsui3",
    fullName: "Tsim Sha Tsui Ferry Pier 3",
    version: "2.0 (Final Version)",
    releaseDate: "2010-12-25",
    status: ReleaseStatus.Released,
    maxPlayers: 24,
    icon: "/csmaps/icon11.jpg",
    images: [
      {
        url: "/csmaps/map2_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map2_2.jpg",
        caption: "Star Ferry",
      },
      {
        url: "/csmaps/map2_3.jpg",
        caption: "VIP Escape Point",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heKvuq",
      "https://www.dropbox.com/s/euchy43y22mv67f/as_taxi_tsimshatsui3.rar?dl=0",
    ],
  },
  {
    id: 24,
    categoryId: 1,
    name: "as_taxi_hotel",
    fullName: "The Hotel",
    version: "1.0 (Final Version)",
    releaseDate: "2019-05-04",
    status: ReleaseStatus.Released,
    maxPlayers: 24,
    icon: "/csmaps/icon24.jpg",
    images: [
      {
        url: "/csmaps/map24.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map24_1.jpg",
        caption: "Entrance (VIP Escape Point)",
      },
      {
        url: "/csmaps/map24_2.jpg",
        caption: "Hotel Room",
      },
      {
        url: "/csmaps/map24_3.jpg",
        caption: "Hotel Room",
      },
      {
        url: "/csmaps/map24_4.jpg",
        caption: "Hallway",
      },
      {
        url: "/csmaps/map24_5.jpg",
        caption: "Restaurant",
      },
      {
        url: "/csmaps/map24_6.jpg",
        caption: "Restaurant",
      },
      {
        url: "/csmaps/map24_7.jpg",
        caption: "Bar",
      },
    ],
    downloadLinks: ["https://1drv.ms/u/s!AjxD9FDQGclqlq1u2NnukFoj1GBGHA"],
  },

  // CS
  {
    id: -2,
    categoryId: 2,
    name: "cs_taxi_stgss",
    fullName: "Sha Tin Government Secondary School",
    version: "0.99 (Beta Version)",
    releaseDate: "2007-11-05",
    status: ReleaseStatus.Unavailable,
    maxPlayers: 26,
    icon: "/csmaps/icon5.jpg",
    images: [],
    downloadLinks: [],
  },
  {
    id: 3,
    categoryId: 2,
    name: "cs_taxi_stgss2",
    fullName: "Sha Tin Government Secondary School 2",
    version: "2.0 (Final Version)",
    releaseDate: "2008-03-22",
    status: ReleaseStatus.Released,
    maxPlayers: 16,
    icon: "/csmaps/icon3.jpg",
    images: [
      {
        url: "/csmaps/map3_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map3_2.jpg",
        caption: "Covered Playground",
      },
      {
        url: "/csmaps/map3_3.jpg",
        caption: "Campus",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZxQ8q",
      "https://www.dropbox.com/s/60mxg0wumnkspxi/cs_taxi_stgss2.rar?dl=0",
    ],
  },
  {
    id: 4,
    categoryId: 2,
    name: "cs_taxi_stgss3",
    fullName: "Sha Tin Government Secondary School 3",
    version: "3.15 (Final Version)",
    releaseDate: "2009-08-12",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon4.jpg",
    images: [
      {
        url: "/csmaps/map4_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map4_2.jpg",
        caption: "Covered Playground",
      },
      {
        url: "/csmaps/map4_3.jpg",
        caption: "Campus",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZxRcg",
      "https://www.dropbox.com/s/lupjc33bh91efya/cs_taxi_stgss3.rar?dl=0",
    ],
  },
  {
    id: 11,
    categoryId: 2,
    name: "cs_taxi_country",
    fullName: "Hong Kong Country Park",
    version: "2.0 (Final Version)",
    releaseDate: "2010-02-11",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon13.jpg",
    images: [
      {
        url: "/csmaps/map11_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map11_2.jpg",
        caption: "Country Park Entrance (Hostage Rescue Point)",
      },
      {
        url: "/csmaps/map11_2.jpg",
        caption: "Camp (Location of the Hostages)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZxIWh",
      "https://www.dropbox.com/s/aq0y3eo8vgfecyj/cs_taxi_country.rar?dl=0",
    ],
  },
  {
    id: 13,
    categoryId: 2,
    name: "cs_taxi_island",
    fullName: "Little Island",
    version: "11.0 (Final Version)",
    releaseDate: "2011-04-30",
    status: ReleaseStatus.Released,
    maxPlayers: 30,
    icon: "/csmaps/icon15.jpg",
    images: [
      {
        url: "/csmaps/map13_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map13_2.jpg",
        caption: "Beach",
      },
      {
        url: "/csmaps/map13_3.jpg",
        caption: "Alley",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heKG96",
      "https://www.dropbox.com/s/zztoxtynftns1mw/cs_taxi_island.rar?dl=0",
    ],
  },
  {
    id: 16,
    categoryId: 2,
    name: "cs_taxi_stgss4",
    fullName: "Sha Tin Government Secondary School 4",
    version: "1.0 (Final Version)",
    releaseDate: "2019-03-29",
    status: ReleaseStatus.Released,
    maxPlayers: 30,
    icon: "/csmaps/icon18.jpg",
    images: [
      {
        url: "/csmaps/map16_1-01(1).jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map16_2.jpg",
        caption: "Campus",
      },
      {
        url: "/csmaps/map16_3.jpg",
        caption: "Campus 2",
      },
      {
        url: "/csmaps/map16_4.jpg",
        caption: "Hall",
      },
      {
        url: "/csmaps/map16_5.jpg",
        caption: "Reception",
      },
      {
        url: "/csmaps/map16_6.jpg",
        caption: "Covered Playground",
      },
    ],
    downloadLinks: [
      "https://1drv.ms/u/s!AjxD9FDQGclqlqxt1Clf2q5DajrCFw",
      "https://drive.google.com/file/d/10bAv-es9CdRZXbvm5gUeZtZdFEhhCvoc/view?usp=sharing",
    ],
  },
  {
    id: 20,
    categoryId: 2,
    name: "cs_taxi_public2",
    fullName: "Hong Kong Public Housing Estate 2",
    version: "1.2 (Final Version)",
    releaseDate: "2012-02-14",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon22.jpg",
    images: [
      {
        url: "/csmaps/map20_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map20_2.jpg",
        caption: "Light Rail Station (Hostage Rescue Point)",
      },
      {
        url: "/csmaps/map20_3.jpg",
        caption: "Public Housing Building",
      },
      {
        url: "/csmaps/map20_4.jpg",
        caption: "Bus Terminus",
      },
      {
        url: "/csmaps/map20_5.jpg",
        caption: "Shopping Centre",
      },
      {
        url: "/csmaps/map20_6.jpg",
        caption: "Market",
      },
      {
        url: "/csmaps/map20_7.jpg",
        caption: "Cooked Food Stall (Location of Hostages)",
      },
      {
        url: "/csmaps/map20_9.jpg",
        caption: "Seafood Restaurant",
      },
      {
        url: "/csmaps/map20_10.jpg",
        caption: "Garbage Collection",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZxO0b",
      "https://www.dropbox.com/s/kkk1946cfeb1qs9/cs_taxi_public2.rar?dl=0",
    ],
  },

  // DE
  {
    id: 5,
    categoryId: 3,
    name: "de_taxi_shatinpark",
    fullName: "Sha Tin Park (North Garden)",
    version: "5.1 (Final Version)",
    releaseDate: "2008-05-13",
    status: ReleaseStatus.Released,
    maxPlayers: 16,
    icon: "/csmaps/icon6.jpg",
    images: [
      {
        url: "/csmaps/map5_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map5_2.jpg",
        caption: "Main Park",
      },
      {
        url: "/csmaps/map5_3.jpg",
        caption: "Castle (Bomb Planting Site)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyxyp",
      "https://www.dropbox.com/s/jxr2dcrgzt11ump/de_taxi_shatinpark.rar?dl=0",
    ],
  },
  {
    id: 6,
    categoryId: 3,
    name: "de_taxi_mtr",
    fullName: "Hong Kong Mass Transit Railway Station",
    version: "3.5 (Final Version)",
    releaseDate: "2009-05-25",
    status: ReleaseStatus.Released,
    maxPlayers: 20,
    icon: "/csmaps/icon7.jpg",
    images: [
      {
        url: "/csmaps/map6_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map6_2.jpg",
        caption: "Station Concourse",
      },
      {
        url: "/csmaps/map6_3.jpg",
        caption: "Station Platform (Bomb Planting Site B)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heLk6p",
      "https://www.dropbox.com/s/7dchiapx4pfpm5c/de_taxi_mtr.rar?dl=0",
    ],
  },
  {
    id: 7,
    categoryId: 3,
    name: "de_taxi_luckyplaza",
    fullName: "Lucky Plaza and Sha Tin Centre",
    version: "4.55 (Final Version)",
    releaseDate: "2009-07-07",
    status: ReleaseStatus.Released,
    maxPlayers: 24,
    icon: "/csmaps/icon8.jpg",
    images: [
      {
        url: "/csmaps/map7_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map7_2.jpg",
        caption: "Outside of Lucky Plaza",
      },
      {
        url: "/csmaps/map7_3.jpg",
        caption: "Supermarket (Bomb Planting Site A)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heL8UR",
      "https://www.dropbox.com/s/bxzmj6dbxjy69xw/de_taxi_luckyplaza.rar?dl=0",
    ],
  },
  {
    id: 8,
    categoryId: 3,
    name: "de_taxi_public",
    fullName: "Hong Kong Public Housing Estate",
    version: "2.5 (Final Version)",
    releaseDate: "2009-08-01",
    status: ReleaseStatus.Released,
    maxPlayers: 30,
    icon: "/csmaps/icon9.jpg",
    images: [
      {
        url: "/csmaps/map8_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map8_2.jpg",
        caption: "Public Housing Buildings",
      },
      {
        url: "/csmaps/map8_3.jpg",
        caption: "Bus Terminus (Bomb Planting Site A)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyq5R",
      "https://www.dropbox.com/s/cmrwyw04xiynpky/de_taxi_public.rar?dl=0",
    ],
  },
  {
    id: 9,
    categoryId: 3,
    name: "de_taxi_mtr2",
    fullName: "Hong Kong Mass Transit Railway Station 2",
    version: "2.0 (Final Version)",
    releaseDate: "2010-05-16",
    status: ReleaseStatus.Released,
    maxPlayers: 24,
    icon: "/csmaps/icon12.jpg",
    images: [
      {
        url: "/csmaps/map9_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map9_2.jpg",
        caption: "Station Concourse (Bomb Plating Site A)",
      },
      {
        url: "/csmaps/map9_3.jpg",
        caption: "Station Platform (Bomb Plating Site B)",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZya6Q",
      "https://www.dropbox.com/s/tn7wf6g3dyitimx/de_taxi_mtr2.rar?dl=0",
    ],
  },
  {
    id: 12,
    categoryId: 3,
    name: "de_taxi_parkandwell",
    fullName: "Park n' Shop and Wellcome Superstores",
    version: "1.0 (Final Version)",
    releaseDate: "2011-04-11",
    status: ReleaseStatus.Released,
    maxPlayers: 30,
    icon: "/csmaps/icon14.jpg",
    images: [
      {
        url: "/csmaps/map12_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map12_2.jpg",
        caption: "Park n' Shop Supermarket",
      },
      {
        url: "/csmaps/map12_3.jpg",
        caption: "Wellcome Supermarket",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heLHOu",
      "https://www.dropbox.com/s/xwi23i3zkz4y047/de_taxi_parkandwell.rar?dl=0",
    ],
  },
  {
    id: 15,
    categoryId: 3,
    name: "de_taxi_mtr3",
    fullName: "Hong Kong Mass Transit Railway Station 3",
    version: "0.7",
    releaseDate: "2011-06-08",
    status: ReleaseStatus.InProgress,
    maxPlayers: 30,
    icon: "/csmaps/icon17.jpg",
    images: [
      {
        url: "/csmaps/map15_1-01.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map15_2.jpg",
        caption: "Mei Foo Station (Tsuen Wan Line)",
      },
      {
        url: "/csmaps/map15_3.jpg",
        caption: "Mei Foo Station (West Rail Line)",
      },
      {
        url: "/csmaps/map15_4.jpg",
        caption: "Platform (West Rail Line)",
      },
      {
        url: "/csmaps/map15_5.jpg",
        caption: "Concourse (West Rail Line)",
      },
      {
        url: "/csmaps/map15_6.jpg",
        caption: "Lai Chi Kok Park",
      },
      {
        url: "/csmaps/map15_7.jpg",
        caption: "Concourse (Tsuen Wan Line)",
      },
      {
        url: "/csmaps/map15_8.jpg",
        caption: "Platform (Tsuen Wan Line)",
      },
    ],
    downloadLinks: [],
    progressPercentage: 70,
  },
  {
    id: 17,
    categoryId: 3,
    name: "de_taxi_aquaplaza",
    fullName: "Aquaplaza",
    version: "1.0 (Final Version)",
    releaseDate: "2011-09-01",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon19.jpg",
    images: [
      {
        url: "/csmaps/map17_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map17_2.jpg",
        caption: "Shopping Mall Entrance",
      },
      {
        url: "/csmaps/map17_3.jpg",
        caption: "Elevator to Second Floor",
      },
      {
        url: "/csmaps/map17_4.jpg",
        caption: "Second Floor of Shopping Mall",
      },
      {
        url: "/csmaps/map17_5.jpg",
        caption: "Bomb Plating Site B",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZxSNp",
      "https://www.dropbox.com/s/y84zz0qzbtd6c84/de_taxi_aquaplaza.rar?dl=0",
    ],
  },
  {
    id: 19,
    categoryId: 3,
    name: "de_taxi_village",
    fullName: "Walled Village",
    version: "1.2 (Final Version)",
    releaseDate: "2012-02-02",
    status: ReleaseStatus.Released,
    maxPlayers: 30,
    icon: "/csmaps/icon21.jpg",
    images: [
      {
        url: "/csmaps/map19_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map19_2.jpg",
        caption: "Salon",
      },
      {
        url: "/csmaps/map19_3.jpg",
        caption: "Hallway",
      },
      {
        url: "/csmaps/map19_4.jpg",
        caption: "Restaurant",
      },
      {
        url: "/csmaps/map19_5.jpg",
        caption: "Bomb Planting Site A",
      },
      {
        url: "/csmaps/map19_6.jpg",
        caption: "Clinic",
      },
      {
        url: "/csmaps/map19_7.jpg",
        caption: "Bomb Planting Site B",
      },
      {
        url: "/csmaps/map19_8.jpg",
        caption: "Clinic",
      },
      {
        url: "/csmaps/map19_9.jpg",
        caption: "Grocery Store",
      },
      {
        url: "/csmaps/map19_10.jpg",
        caption: "Restaurant Kitchen",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1heLXgp",
      "https://www.dropbox.com/s/g4wkljwg28vi9yu/de_taxi_village.rar?dl=0",
    ],
  },

  // DM
  {
    id: 18,
    categoryId: 4,
    name: "dm_taxi_shingking",
    fullName: "Shing King Garden",
    version: "2.0 (Final Version)",
    releaseDate: "2012-01-06",
    status: ReleaseStatus.Released,
    maxPlayers: 10,
    icon: "/csmaps/icon20.jpg",
    images: [
      {
        url: "/csmaps/map18_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map18_2.jpg",
        caption: "Buildings",
      },
      {
        url: "/csmaps/map18_3.jpg",
        caption: "Living Room",
      },
      {
        url: "/csmaps/map18_4.jpg",
        caption: "Bedroom",
      },
      {
        url: "/csmaps/map18_5.jpg",
        caption: "Kitchen",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyzpX",
      "https://www.dropbox.com/s/47p72b72n43knb6/dm_taxi_shingking.rar?dl=0",
    ],
  },
  {
    id: 25,
    categoryId: 4,
    name: "dm_taxi_wakiuvillage",
    fullName: "Wa Kiu Village",
    version: "1.0 (Final Version)",
    releaseDate: "2019-05-20",
    status: ReleaseStatus.Released,
    maxPlayers: 10,
    icon: "/csmaps/icon25.jpg",
    images: [
      {
        url: "/csmaps/map25.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map25_1.jpg",
        caption: "Living Room (Counter-Terrorist Spawn Spot)",
      },
      {
        url: "/csmaps/map25_2.jpg",
        caption: "Kitchen",
      },
      {
        url: "/csmaps/map25_3.jpg",
        caption: "Bedroom",
      },
      {
        url: "/csmaps/map25_4.jpg",
        caption: "Bedroom",
      },
      {
        url: "/csmaps/map25_5.jpg",
        caption: "Staircase",
      },
      {
        url: "/csmaps/map25_6.jpg",
        caption: "Entrance (Terrorist Spawn Spot)",
      },
    ],
    downloadLinks: ["https://1drv.ms/f/s!AjxD9FDQGclqixhjDzCBJMqn7P8l"],
  },

  // ES
  {
    id: 14,
    categoryId: 5,
    name: "es_taxi_border",
    fullName: "Border Control Point",
    version: "3.0 (Final Version)",
    releaseDate: "2011-05-14",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon16.jpg",
    images: [
      {
        url: "/csmaps/map14_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map14_2.jpg",
        caption: "Hong Kong Departure Port",
      },
      {
        url: "/csmaps/map14_3.jpg",
        caption: "China Arrival Port",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyDG8",
      "https://www.dropbox.com/s/rigw028w0u4rko4/es_taxi_border.rar?dl=0",
    ],
  },
  {
    id: 21,
    categoryId: 5,
    name: "es_taxi_highspeedrail",
    fullName: "High Speed Rail",
    version: "1.0 (Initial Release)",
    releaseDate: "2019-03-15",
    status: ReleaseStatus.Released,
    maxPlayers: 32,
    icon: "/csmaps/icon23.jpg",
    progressPercentage: 95,
    images: [
      {
        url: "/csmaps/map23.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map23_1p.jpg",
        caption: "Level B1 (Terrorist Spawn Spot)",
      },
      {
        url: "/csmaps/map23_2p.jpg",
        caption: "Levels B2 and B3",
      },
      {
        url: "/csmaps/map23_3p.jpg",
        caption: "Levels B1 Ticketing Counter",
      },
      {
        url: "/csmaps/map23_4p.jpg",
        caption: "Levels B3 Departure Concourse",
      },
      {
        url: "/csmaps/map23_5p.jpg",
        caption: "Level B3 Atrium",
      },
      {
        url: "/csmaps/map23_6p.jpg",
        caption:
          "Level B4 Platform (Counter-Terrorist Spawn Spot and Escape Point)",
      },
      {
        url: "/csmaps/map23_7p.jpg",
        caption: "Level B2 Arrival Concourse",
      },
    ],
    downloadLinks: [
      "https://drive.google.com/file/d/1BlxyGwWS1gexDRZ9BRwLjqHDHOceZH6p/view?usp=sharing",
      "https://1drv.ms/u/s!AjxD9FDQGclqlqtwdC_kQMYe2rMEww",
    ],
  },

  // KA
  {
    id: 10,
    categoryId: 6,
    name: "ka_taxi_newtownplaza",
    fullName: "New Town Plaza, Sha Tin",
    version: "2.0 (Final Version)",
    releaseDate: "2009-06-19",
    status: ReleaseStatus.Released,
    maxPlayers: 20,
    icon: "/csmaps/icon10.jpg",
    images: [
      {
        url: "/csmaps/map10_1.jpg",
        caption: "Floor Plan",
      },
      {
        url: "/csmaps/map10_2.jpg",
        caption: "Plaza",
      },
      {
        url: "/csmaps/map10_3.jpg",
        caption: "Entrance",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyFy2",
      "https://www.dropbox.com/s/btbl073cj3yvyru/ka_taxi_newtownplaza.bsp?dl=0",
    ],
  },
];
