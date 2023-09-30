import { GameVersion, MapItem, ReleaseStatus } from "shared/types/cs-map-types";

export const mapItems: Array<MapItem> = [
  {
    id: 201,
    categoryId: 3,
    name: "de_taxi_plaza",
    fullName: "Battle at Plaza",
    version: "0.01",
    releaseDate: "2023-10-22",
    status: ReleaseStatus.InProgress,
    maxPlayers: 10,
    icon: "/csmaps/icon201.jpg",
    targetGameVersion: GameVersion.COUNTER_STRIKE_2,
    images: [
      {
        url: "https://live.staticflickr.com/65535/53281318131_69bae20cbe_b.jpg",
        caption: "Prototype",
      },
    ],
    downloadLinks: [],
    progressPercentage: 1,
  },
];
