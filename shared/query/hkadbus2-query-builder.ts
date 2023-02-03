import type { SearchPhotoQuery } from "shared/types/hkadbus2-types";

const SEARCH_BASE_URL = "search";

export function buildPhotoSearchUrl(query: SearchPhotoQuery): string {
  const searchParams = new URLSearchParams(query);
  return `${SEARCH_BASE_URL}?${searchParams.toString()}`;
}
