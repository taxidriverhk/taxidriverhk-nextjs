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

export type GetBusModelsResponse = {
  busModels: Array<BusModel>;
};

export type GetCategoriesResponse = {
  categories: Array<Category>;
};
