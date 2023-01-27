type Category = {
  id: string;
  name: string;
  thumbnail: string;
};

export type GetCategoriesResponse = {
  categories: Array<Category>;
};
