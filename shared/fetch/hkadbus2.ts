import axios from "axios";
import snakeCase from "lodash/snakeCase";

import type {
  GetAdvertisementsResponse,
  GetBusModelsResponse,
  GetCategoriesResponse,
  GetPhotoResponse,
  SearchPhotoQuery,
  SearchPhotosResponse,
  SortOrder,
} from "shared/types/hkadbus2-types";

const API_ENDPOINT = "https://tomcat.taxidriverhk.com/hkadbus2/api";

export async function fetchGetAdvertisements(
  categoryId: string,
  locale?: string
): Promise<GetAdvertisementsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGet(`/categories/${categoryId}/advertisements`, {
    language: convertedLocale,
  });
}

export async function fetchGetBusModels(
  locale?: string
): Promise<GetBusModelsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGet("/bus-models", { language: convertedLocale });
}

export async function fetchGetCategories(
  locale?: string
): Promise<GetCategoriesResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGet("/categories", { language: convertedLocale });
}

export async function fetchGetPhoto(
  photoId: number,
  locale?: string
): Promise<GetPhotoResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGet(`/photos/${photoId}`, { language: convertedLocale });
}

export async function fetchSearchPhotos(
  query: SearchPhotoQuery,
  orderBy: string,
  sort: SortOrder,
  locale?: string
): Promise<SearchPhotosResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  const convertedQuery = Object.entries(query).reduce(
    (result, [key, value]) => ({
      ...result,
      [snakeCase(key)]: value,
    }),
    {}
  );
  return await fetchGet("/photos", {
    ...convertedQuery,
    search_text: query.q,
    order_by: orderBy,
    sort,
    language: convertedLocale,
  });
}

function convertLocaleToLanguage(locale?: string): string {
  return (locale || "en-US").replace("-", "_").toLowerCase();
}

async function fetchGet<T>(endpoint: string, params: any) {
  const response = await axios.get<T>(`${API_ENDPOINT}${endpoint}`, { params });
  const { data } = response;
  return data;
}
