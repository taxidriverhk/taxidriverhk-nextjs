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

// API response models and mapper, copied from //taxidriverhk-csmaps/schemas.ts
export enum ReleaseStatusEnum {
  Released = 0,
  InProgress,
  Unavailable,
}

export enum GameVersionEnum {
  COUNTER_STRIKE_1_6 = 0,
  COUNTER_STRIKE_2,
}

export type Category = {
  abbr: string;
  full_name: string;
  id: number;
};

export type Map = {
  category_id: number;
  download_links?: Array<string>;
  full_name?: string;
  icon: string;
  id?: number;
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  max_players?: number;
  name: string;
  progress_percentage?: number;
  release_date?: Date;
  status: ReleaseStatusEnum;
  target_game_version: GameVersionEnum;
  update_date: Date;
  version?: string;
};

export type Tutorial = {
  content?: string;
  creation_date: Date;
  is_draft: boolean;
  hash_key: string;
  last_update_date?: Date;
  target_game_version: GameVersionEnum;
  thumbnail: string;
  title: string;
};

// API models
export type GetMapsResponse = {
  categories: Array<Category>;
  maps: Array<Map>;
};

export type GetTutorialsResponse = {
  tutorials: Array<Tutorial>;
};

type Nullable<T> = T | null | undefined;

export class CsMapsDataMapper {
  static toCategory({ id, abbr, full_name }: Category): MapCategory {
    return {
      id,
      abbr,
      fullName: full_name,
    };
  }

  static toMapItem({
    category_id,
    download_links = [],
    full_name = "",
    icon,
    id = 0,
    images = [],
    max_players = 0,
    name,
    progress_percentage,
    release_date,
    status,
    target_game_version,
    version = "",
  }: Map): MapItem {
    return {
      categoryId: category_id,
      downloadLinks: download_links,
      fullName: full_name,
      icon,
      id,
      images,
      maxPlayers: max_players,
      name,
      progressPercentage: progress_percentage,
      version,
      releaseDate: this.toDateString(release_date) as string,
      status: parseInt(status as unknown as string, 10) as ReleaseStatus,
      targetGameVersion: this.toGameVersion(
        parseInt(target_game_version as unknown as string, 10)
      ),
    };
  }

  static toDateString(date?: Date): Nullable<string> {
    if (date == null) {
      return null;
    }
    return new Date(date).toISOString().substring(0, 10);
  }

  static toGameVersion(gameVersion: GameVersionEnum): GameVersion {
    if (gameVersion === GameVersionEnum.COUNTER_STRIKE_1_6) {
      return GameVersion.COUNTER_STRIKE_1_6;
    }
    return GameVersion.COUNTER_STRIKE_2;
  }

  static toTutorial({
    content = "",
    creation_date,
    is_draft,
    hash_key,
    last_update_date,
    target_game_version,
    thumbnail,
    title,
  }: Tutorial): MapTutorial {
    return {
      content,
      creationDate: this.toDateString(creation_date) as string,
      isDraft: is_draft,
      hashKey: hash_key,
      lastUpdateDate: this.toDateString(last_update_date) as string,
      targetGameVersion: this.toGameVersion(target_game_version),
      thumbnail,
      title,
    };
  }
}
