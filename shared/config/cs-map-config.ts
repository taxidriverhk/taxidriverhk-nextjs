import {
  GameVersion,
  MapCategory,
  MapItem,
  MapTutorial,
  ReleaseStatus,
} from "shared/types/cs-map-types";

import {
  mapItems as cs2MapItems,
  mapTutorials as cs2MapTutorials,
} from "shared/config/cs2-map-config";

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
  ...cs2MapItems,
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52633794936_ccfa1a31f7_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633794896_ae5a9cc523_o_d.jpg",
        caption: "Star Ferry",
      },
      {
        url: "https://live.staticflickr.com/65535/52634052024_2bfca2c6d1_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52633794611_6862686b91_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634233575_cb4b191111_o_d.jpg",
        caption: "Star Ferry",
      },
      {
        url: "https://live.staticflickr.com/65535/52633282367_a9239f5811_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52656989652_d4be66ce9b_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633777541_7d5ccffbef_o_d.jpg",
        caption: "Entrance (VIP Escape Point)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633264762_ff982454b6_o_d.jpg",
        caption: "Hotel Room",
      },
      {
        url: "https://live.staticflickr.com/65535/52633264662_1bcae6c982_o_d.jpg",
        caption: "Hotel Room",
      },
      {
        url: "https://live.staticflickr.com/65535/52634034009_c650fa349f_o_d.jpg",
        caption: "Hallway",
      },
      {
        url: "https://live.staticflickr.com/65535/52634033894_da0d138be7_o_d.jpg",
        caption: "Restaurant",
      },
      {
        url: "https://live.staticflickr.com/65535/52633776656_b36fec6d60_o_d.jpg",
        caption: "Restaurant",
      },
      {
        url: "https://live.staticflickr.com/65535/52634261283_ccb305cc72_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634051534_a74a8a9c2d_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634233260_1ee935e47d_o_d.jpg",
        caption: "Covered Playground",
      },
      {
        url: "https://live.staticflickr.com/65535/52633794161_2da8750295_z.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634279113_3615f5f552_z.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634279028_6dc7b7143a_o_d.jpg",
        caption: "Covered Playground",
      },
      {
        url: "https://live.staticflickr.com/65535/52634278863_e1fcd6966e_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634259528_85fd672804_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633790561_c52db37a1b_o_d.jpg",
        caption: "Country Park Entrance (Hostage Rescue Point)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633790341_4e41a302d0_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634228360_b4778f858d_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633789751_3dbb51d2fb_o_d.jpg",
        caption: "Beach",
      },
      {
        url: "https://live.staticflickr.com/65535/52634046709_22408a5aa5_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52656922507_a492df979a_c_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634271843_261a67a7d5_o_d.jpg",
        caption: "Campus",
      },
      {
        url: "https://live.staticflickr.com/65535/52634224975_16e2c0b1a5_o_d.jpg",
        caption: "Campus 2",
      },
      {
        url: "https://live.staticflickr.com/65535/52634259443_211c01461f_o_d.jpg",
        caption: "Hall",
      },
      {
        url: "https://live.staticflickr.com/65535/52633273697_a339d81076_o_d.jpg",
        caption: "Reception",
      },
      {
        url: "https://live.staticflickr.com/65535/52634223940_f727a268fd_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634267943_4f82d0c0ce_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634039879_64be3dbdf0_o_d.jpg",
        caption: "Light Rail Station (Hostage Rescue Point)",
      },
      {
        url: "https://live.staticflickr.com/65535/52634259308_82db2ffabc_o_d.jpg",
        caption: "Public Housing Building",
      },
      {
        url: "https://live.staticflickr.com/65535/52633782286_4276c77a7f_o_d.jpg",
        caption: "Bus Terminus",
      },
      {
        url: "https://live.staticflickr.com/65535/52633269767_a787e0857d_o_d.jpg",
        caption: "Shopping Centre",
      },
      {
        url: "https://live.staticflickr.com/65535/52634038704_a7e7e7b224_o_d.jpg",
        caption: "Market",
      },
      {
        url: "https://live.staticflickr.com/65535/52633262077_18dc82795e_o_d.jpg",
        caption: "Cooked Food Stall (Location of Hostages)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633781311_03d07ae335_o_d.jpg",
        caption: "Seafood Restaurant",
      },
      {
        url: "https://live.staticflickr.com/65535/52633268902_025b250327_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634050664_c39746464f_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634050599_4425bac685_o_d.jpg",
        caption: "Main Park",
      },
      {
        url: "https://live.staticflickr.com/65535/52634232035_4b67579c71_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52633280872_b26f522838_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634278198_5f38170922_o_d.jpg",
        caption: "Station Concourse",
      },
      {
        url: "https://live.staticflickr.com/65535/52633280547_36842c4f40_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634213520_1c44972099_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634231030_d5518ebe98_o_d.jpg",
        caption: "Outside of Lucky Plaza",
      },
      {
        url: "https://live.staticflickr.com/65535/52633279972_7422e3924c_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52633279832_42365f536d_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634213390_d560b91ab3_o_d.jpg",
        caption: "Public Housing Buildings",
      },
      {
        url: "https://live.staticflickr.com/65535/52634049044_9fac0b936a_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634276998_3081d52ce3_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634276908_1a0f841a22_o_d.jpg",
        caption: "Station Concourse (Bomb Plating Site A)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633279322_fe71f5d82f_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634047449_d7d3c481ae_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633278372_8e557f4427_o_d.jpg",
        caption: "Park n' Shop Supermarket",
      },
      {
        url: "https://live.staticflickr.com/65535/52634228550_6a12c9a620_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52656914307_ffee1441db_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633277017_fa382f0268_o_d.jpg",
        caption: "Mei Foo Station (Tsuen Wan Line)",
      },
      {
        url: "https://live.staticflickr.com/65535/52634045914_ae117da19b_o_d.jpg",
        caption: "Mei Foo Station (West Rail Line)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633276742_8f356128ef_o_d.jpg",
        caption: "Platform (West Rail Line)",
      },
      {
        url: "https://live.staticflickr.com/65535/52634045704_0365151175_o_d.jpg",
        caption: "Concourse (West Rail Line)",
      },
      {
        url: "https://live.staticflickr.com/65535/52634226795_7cf3d030c9_o_d.jpg",
        caption: "Lai Chi Kok Park",
      },
      {
        url: "https://live.staticflickr.com/65535/52633787656_d5f63b422b_o_d.jpg",
        caption: "Concourse (Tsuen Wan Line)",
      },
      {
        url: "https://live.staticflickr.com/65535/52634044274_54475f5d4e_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634042364_be5ea62c5f_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634223635_b72d78f534_o_d.jpg",
        caption: "Shopping Mall Entrance",
      },
      {
        url: "https://live.staticflickr.com/65535/52634042104_1a4124c938_o_d.jpg",
        caption: "Elevator to Second Floor",
      },
      {
        url: "https://live.staticflickr.com/65535/52634270183_c6d4678552_o_d.jpg",
        caption: "Second Floor of Shopping Mall",
      },
      {
        url: "https://live.staticflickr.com/65535/52633272582_9e2de1111a_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634222245_a3a42bedff_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634040669_a150d3dca5_o_d.jpg",
        caption: "Salon",
      },
      {
        url: "https://live.staticflickr.com/65535/52634259328_7a9212f4e7_o_d.jpg",
        caption: "Hallway",
      },
      {
        url: "https://live.staticflickr.com/65535/52634268788_d2d76e7e08_o_d.jpg",
        caption: "Restaurant",
      },
      {
        url: "https://live.staticflickr.com/65535/52634221845_6da92bf3be_o_d.jpg",
        caption: "Bomb Planting Site A",
      },
      {
        url: "https://live.staticflickr.com/65535/52634268443_2b0075050d_o_d.jpg",
        caption: "Clinic",
      },
      {
        url: "https://live.staticflickr.com/65535/52633783201_b688f01946_o_d.jpg",
        caption: "Bomb Planting Site B",
      },
      {
        url: "https://live.staticflickr.com/65535/52634040039_369f36f0e7_o_d.jpg",
        caption: "Clinic",
      },
      {
        url: "https://live.staticflickr.com/65535/52634259313_93847e1fc4_o_d.jpg",
        caption: "Grocery Store",
      },
      {
        url: "https://live.staticflickr.com/65535/52634039914_34e9516657_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52633272497_668a73b3f0_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634222780_c7da59a33a_o_d.jpg",
        caption: "Buildings",
      },
      {
        url: "https://live.staticflickr.com/65535/52634269838_a41a880534_o_d.jpg",
        caption: "Living Room",
      },
      {
        url: "https://live.staticflickr.com/65535/52634269718_ee2f61c6d0_o_d.jpg",
        caption: "Kitchen",
      },
      {
        url: "https://live.staticflickr.com/65535/52633272212_7830ab43e6_o_d.jpg",
        caption: "Bedroom",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52657768849_aeec102f85_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633776036_e46ffecfcc_o_d.jpg",
        caption: "Living Room (Counter-Terrorist Spawn Spot)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633263262_ccb305cc72_o_d.jpg",
        caption: "Kitchen",
      },
      {
        url: "https://live.staticflickr.com/65535/52633263022_05abce2702_o_d.jpg",
        caption: "Bedroom",
      },
      {
        url: "https://live.staticflickr.com/65535/52634260163_9e8e2dc651_o_d.jpg",
        caption: "Bedroom",
      },
      {
        url: "https://live.staticflickr.com/65535/52634259978_8b8aba1978_o_d.jpg",
        caption: "Staircase",
      },
      {
        url: "https://live.staticflickr.com/65535/52634213020_844e68282b_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634274758_b73690928b_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633789316_e6b3766145_o_d.jpg",
        caption: "Hong Kong Departure Port",
      },
      {
        url: "https://live.staticflickr.com/65535/52634274508_ca3b013c37_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52656922517_ddebd1e9ac_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52633268612_9600a4fd85_o_d.jpg",
        caption: "Level B1 (Terrorist Spawn Spot)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633268367_c3a7dde33f_o_d.jpg",
        caption: "Levels B2 and B3",
      },
      {
        url: "https://live.staticflickr.com/65535/52633779911_3ec8d1ceed_o_d.jpg",
        caption: "Levels B1 Ticketing Counter",
      },
      {
        url: "https://live.staticflickr.com/65535/52634264378_1000519051_o_d.jpg",
        caption: "Levels B3 Departure Concourse",
      },
      {
        url: "https://live.staticflickr.com/65535/52634217480_2cc2bf35a3_o_d.jpg",
        caption: "Level B3 Atrium",
      },
      {
        url: "https://www.flickr.com/photos/10588039@N08/52634035609/sizes/l/",
        caption:
          "Level B4 Platform (Counter-Terrorist Spawn Spot and Escape Point)",
      },
      {
        url: "https://live.staticflickr.com/65535/52633265537_a9050e1967_o_d.jpg",
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
    targetGameVersion: GameVersion.COUNTER_STRIKE_1_6,
    images: [
      {
        url: "https://live.staticflickr.com/65535/52634229805_83bfae7afa_o_d.jpg",
        caption: "Floor Plan",
      },
      {
        url: "https://live.staticflickr.com/65535/52634276323_b341360619_o_d.jpg",
        caption: "Plaza",
      },
      {
        url: "https://live.staticflickr.com/65535/52634276133_96d963bb7d_o_d.jpg",
        caption: "Entrance",
      },
    ],
    downloadLinks: [
      "http://1drv.ms/1qZyFy2",
      "https://www.dropbox.com/s/btbl073cj3yvyru/ka_taxi_newtownplaza.bsp?dl=0",
    ],
  },
];

export const mapTutorials: Array<MapTutorial> = [...cs2MapTutorials];
