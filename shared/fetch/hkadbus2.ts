import axios, { AxiosError } from "axios";
import snakeCase from "lodash/snakeCase";

import { getApiEndpoint } from "shared/config/hkadbus2-config";
import type {
  GetAdvertisementsResponse,
  GetBusModelsResponse,
  GetCategoriesResponse,
  GetEntityOptionsResponse,
  GetPhotoResponse,
  GetUsersResponse,
  ItemNotFoundResponse,
  PutPhotoRequest,
  PutPhotoResponse,
  SearchPhotoQuery,
  SearchPhotosResponse,
  SortOrder,
} from "shared/types/hkadbus2-types";

const PAGE_SIZE = 20;

export async function getAdvertisementsAsync(
  categoryId: string,
  locale?: string
): Promise<GetAdvertisementsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await getWithItemNotFoundHandledAsync(
    `/categories/${categoryId}/advertisements`,
    {
      language: convertedLocale,
    }
  );
}

export async function getBusModelsAsync(
  locale?: string
): Promise<GetBusModelsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await getAsync("/bus-models", { language: convertedLocale });
}

export async function getCategoriesAsync(
  locale?: string
): Promise<GetCategoriesResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await getAsync("/categories", { language: convertedLocale });
}

export async function getEntityOptionsAsync(
  entityType: string,
  locale?: string
): Promise<GetEntityOptionsResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await getAsync(`/entities/${entityType}`, {
    language: convertedLocale,
  });
}

export async function getPhotoAsync(
  photoId: number,
  locale?: string
): Promise<GetPhotoResponse> {
  const convertedLocale = convertLocaleToLanguage(locale);
  return await getWithItemNotFoundHandledAsync(`/photos/${photoId}`, {
    language: convertedLocale,
  });
}

export async function getUsersAsync(): Promise<GetUsersResponse> {
  return await getAsync("/users", {});
}

export async function searchPhotosAsync(
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
  return await getAsync("/photos", {
    ...convertedQuery,
    search_text: query.q,
    order_by: orderBy,
    sort,
    size: size ?? PAGE_SIZE,
    next_sort_key: cursor,
    language: convertedLocale,
  });
}

export async function searchPhotosFromClientSideAsync(
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

export async function insertPhotoAsync(
  apiKey: string,
  payload: PutPhotoRequest
): Promise<PutPhotoResponse> {
  const { data } = await axios.post<PutPhotoResponse>(
    `${getApiEndpoint()}/photo`,
    payload,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  return data;
}

export async function insertPhotoFromClientSideAsync(
  apiKey: string,
  payload: PutPhotoRequest
): Promise<number> {
  const { data } = await axios.post<PutPhotoResponse>(
    "/api/hkadbus2/insert-photo",
    payload,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  return data.photoId;
}

export async function isAuthorizedToInsertPhotosAsync(
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

async function getAsync<T>(endpoint: string, params: any) {
  const response = await axios.get<T>(`${getApiEndpoint()}${endpoint}`, {
    params,
  });
  const { data } = response;
  return data;
}

async function getWithItemNotFoundHandledAsync<T>(
  endpoint: string,
  params: any
): Promise<
  (GetAdvertisementsResponse | GetPhotoResponse) & ItemNotFoundResponse
> {
  try {
    return await getAsync(endpoint, params);
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
