export enum ReleaseStatus {
  Released = 0,
  InProgress,
  Unavailable,
}

export enum GameVersion {
  COUNTER_STRIKE_1_6 = "Counter Strike 1.6",
  COUNTER_STRIKE_2 = "Counter Strike 2",
}

export const releaseStatusDisplayText = {
  [ReleaseStatus.InProgress]: "In Progress",
  [ReleaseStatus.Unavailable]: "Unavailable",
};

export const gameVersionBadgeColor = {
  [GameVersion.COUNTER_STRIKE_1_6]: "secondary",
  [GameVersion.COUNTER_STRIKE_2]: "warning",
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
  targetGameVersion: GameVersion;
};

export type MapTutorial = {
  title: string;
  hashKey: string;
  content: string;
  creationDate: string;
  lastUpdateDate: string;
  thumbnail: string;
  targetGameVersion: GameVersion;
  isDraft: boolean;
};
