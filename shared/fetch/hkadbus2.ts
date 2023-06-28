import axios, { AxiosError } from "axios";
import snakeCase from "lodash/snakeCase";

import type {
  GetAdvertisementsResponse,
  GetBusModelsResponse,
  GetCategoriesResponse,
  GetEntityOptionsResponse,
  GetPhotoResponse,
  ItemNotFoundResponse,
  SearchPhotoQuery,
  SearchPhotosResponse,
  SortOrder,
} from "shared/types/hkadbus2-types";

const API_ENDPOINT = "http://127.0.0.1:8080/hkadbus2/api";
const PAGE_SIZE = 20;

export async function fetchGetAdvertisements(
  categoryId: string,
  locale?: string
): Promise<GetAdvertisementsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGetWithItemNotFoundHandled(
    `/categories/${categoryId}/advertisements`,
    {
      language: convertedLocale,
    }
  );
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

export async function fetchGetEntityOptions(
  entityType: string,
  language: string
): Promise<GetEntityOptionsResponse> {
  return await fetchGet(`/entities/${entityType}`, { language });
}

export async function fetchGetPhoto(
  photoId: number,
  locale?: string
): Promise<GetPhotoResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await fetchGetWithItemNotFoundHandled(`/photos/${photoId}`, {
    language: convertedLocale,
  });
}

export async function fetchSearchPhotos(
  query: SearchPhotoQuery,
  orderBy: string,
  sort: SortOrder,
  locale?: string,
  cursor?: string,
  size?: number
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
    size: size ?? PAGE_SIZE,
    next_sort_key: cursor,
    language: convertedLocale,
  });
}

export async function fetchSearchPhotosFromClientSide(
  searchQuery: SearchPhotoQuery,
  orderBy: string,
  sort: SortOrder,
  locale?: string,
  cursor?: string
): Promise<SearchPhotosResponse> {
  const { data } = await axios.post<SearchPhotosResponse>(
    "/api/hkadbus2/search-photos-with-cursor",
    {
      params: {
        searchQuery,
        orderBy,
        sort,
        cursor,
        locale,
      },
    }
  );
  return data;
}

export async function isAuthorizedToInsertPhotos(
  apiKey: string
): Promise<boolean> {
  try {
    const response = await axios.options(`${getApiEndpoint()}/photo`, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.status === 200;
  } catch (_error) {
    return false;
  }
}

function convertLocaleToLanguage(locale?: string): string {
  return (locale || "en-US").replace("-", "_").toLowerCase();
}

async function fetchGet<T>(endpoint: string, params: any) {
  const response = await axios.get<T>(`${getApiEndpoint()}${endpoint}`, {
    params,
  });
  const { data } = response;
  return data;
}

async function fetchGetWithItemNotFoundHandled<T>(
  endpoint: string,
  params: any
): Promise<
  (GetAdvertisementsResponse | GetPhotoResponse) & ItemNotFoundResponse
> {
  try {
    return await fetchGet(endpoint, params);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 404) {
      return {
        notFound: true,
      };
    } else {
      throw new Error(axiosError.message);
    }
  }
}

function getApiEndpoint(): string {
  const endpointOverride = process.env.HKADBUS2_API_ENDPOINT;
  return endpointOverride != null ? endpointOverride : API_ENDPOINT;
}
