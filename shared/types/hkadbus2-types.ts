export enum BusCompany {
  KMB = "KMB",
  CTB = "CTB",
  CMB = "CMB",
  LWB = "LWB",
  NWFB = "NWFB",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum TypeaheadOptionType {
  ADVERTISEMENT = "advertisement",
  BUS_MODEL = "bus-model",
  CATEGORY = "category",
  LOCATION = "location",
  LICENSE_PLATE_NUMBER = "license-plate-number",
  ROUTE = "route",
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

export type PutPhotoRequestString = {
  en_us: string;
  zh_hk: string;
};

export type PutPhotoRequest = {
  advertisementId: string;
  advertisementNames: PutPhotoRequestString;
  busBrandId: string;
  busBrandNames: PutPhotoRequestString;
  busModelId: string;
  busModelNames: PutPhotoRequestString;
  busCompany: BusCompany;
  routeNumber: string;
  busRouteId: string;
  busRouteStartLocationNames: PutPhotoRequestString;
  busRouteEndLocationNames: PutPhotoRequestString;
  categoryId: string;
  categoryNames: PutPhotoRequestString;
  fleetPrefix: string;
  fleetNumber: string;
  image: string;
  licensePlateNumber: string;
  thumbnail: string;
  username: string;
  additionalTags: string;
};

export type PutPhotoResponse = {
  photoId: number;
};

export type Photo = {
  advertisement: string;
  advertisementId: string;
  busCompany: BusCompany;
  busId: number;
  busBrand: string;
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
  uploaderName?: string;
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

export type ItemNotFoundResponse = {
  notFound?: boolean;
};

export type GetAdvertisementsResponse = {
  advertisements?: Array<Advertisement>;
} & ItemNotFoundResponse;

export type GetBusModelsResponse = {
  busModels: Array<BusModel>;
};

export type GetCategoriesResponse = {
  categories: Array<Category>;
};

export type GetEntityOptionsResponse = {
  entityType: TypeaheadOptionType;
  options: {
    [key: string]: string;
  };
};

export type GetPhotoResponse = {
  photo?: Photo;
} & ItemNotFoundResponse;

export type SearchPhotosResponse = {
  nextPageCursor: string | null;
  results: Array<SearchPhotoResult>;
  total: number;
};
