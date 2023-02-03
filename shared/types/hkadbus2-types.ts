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

export type GetAdvertisementsResponse = {
  advertisements: Array<Advertisement>;
};

export type GetBusModelsResponse = {
  busModels: Array<BusModel>;
};

export type GetCategoriesResponse = {
  categories: Array<Category>;
};
