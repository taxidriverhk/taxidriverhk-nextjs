import {
  ItemNotFoundResponse,
  getAsync,
  getWithItemNotFoundHandledAsync,
} from "shared/fetch/common";

import { getApiEndpoint } from "shared/config/cs-map-config";
import {
  Map as GetMapResponse,
  GetMapsResponse,
  GetStatisticsResponse,
  Tutorial as GetTutorialResponse,
  GetTutorialsResponse,
} from "shared/types/cs-map-types";

export async function getMapsAsync(): Promise<GetMapsResponse> {
  return await getAsync<GetMapsResponse>(`${getApiEndpoint()}/maps`, {});
}

export async function getMapAsync(
  mapNameOrId: string
): Promise<GetMapResponse | ItemNotFoundResponse> {
  return await getWithItemNotFoundHandledAsync<GetMapResponse>(
    `${getApiEndpoint()}/maps/${mapNameOrId}`,
    {}
  );
}

export async function getStatisticsAsync(): Promise<GetStatisticsResponse> {
  return await getAsync<GetStatisticsResponse>(
    `${getApiEndpoint()}/statistics`,
    {}
  );
}

export async function getTutorialsAsync(): Promise<GetTutorialsResponse> {
  return await getAsync<GetTutorialsResponse>(
    `${getApiEndpoint()}/tutorials`,
    {}
  );
}

export async function getTutorialAsync(
  id: string
): Promise<GetTutorialResponse | ItemNotFoundResponse> {
  return await getWithItemNotFoundHandledAsync<GetTutorialResponse>(
    `${getApiEndpoint()}/tutorials/${id}`,
    {}
  );
}
