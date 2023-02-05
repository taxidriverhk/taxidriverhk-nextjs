export enum BusCompany {
  KMB = "KMB",
  CTB = "CTB",
  CMB = "CMB",
  NWFB = "NWFB",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type Advertisement = {
  categoryId: string;
  categoryName: string;
  id: string;
  name: string;
  thumbnail: string;
};

export type BusModel = {
  busBrandId: string;
  busBrandName: string;
  id: string;
  name: string;
  thumbnail: string;
};

export type Category = {
  id: string;
  name: string;
  thumbnail: string;
};

export type Photo = {
  advertisement: string;
  advertisementId: string;
  busCompany: BusCompany;
  busId: number;
  busModel: string;
  busModelId: string;
  category: string;
  categoryId: string;
  fleetNumber: string;
  fleetPrefix: string;
  image: string;
  licensePlateNumber: string;
  photoId: number;
  routeNumber: string;
  thumbnail: string;
  uploadedDate: EpochTimeStamp;
  username: string;
};

export type SearchPhotoQuery = {
  q?: string;
  advertisementId?: string;
  busModelId?: string;
  busRouteNumber?: string;
  fleetPrefix?: string;
  fleetNumber?: string;
  licensePlateNumber?: string;
  username?: string;
};

export type SearchPhotoResult = {
  advertisement: string;
  advertisementId: string;
  busCompany: BusCompany;
  busModel: string;
  busModelId: string;
  category: string;
  categoryId: string;
  fleetNumber: string;
  fleetPrefix: string;
  licensePlateNumber: string;
  photoId: number;
  routeId: string;
  routerNumber: string;
  tags: Array<string>;
  thumbnail: string;
  uploadedDate: EpochTimeStamp;
  username: string;
};

export type GetAdvertisementsResponse = {
  advertisements: Array<Advertisement>;
};

export type GetBusModelsResponse = {
  busModels: Array<BusModel>;
};

export type GetCategoriesResponse = {
  categories: Array<Category>;
};

export type GetPhotoResponse = {
  photo: Photo;
};

export type SearchPhotosResponse = {
  nextPageCursor: string | null;
  results: Array<SearchPhotoResult>;
  total: number;
};
