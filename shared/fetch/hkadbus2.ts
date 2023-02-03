import axios from "axios";

import type {
  GetAdvertisementsResponse,
  GetBusModelsResponse,
  GetCategoriesResponse,
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

function convertLocaleToLanguage(locale?: string): string {
  return (locale || "en-US").replace("-", "_").toLowerCase();
}

async function fetchGet<T>(endpoint: string, params: any) {
  const response = await axios.get<T>(`${API_ENDPOINT}${endpoint}`, { params });
  const { data } = response;
  return data;
}
