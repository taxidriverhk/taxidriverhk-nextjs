const SEARCH_BASE_URL = "search";

export type PhotoSearchQuery = {
  q?: string;
  advertisementId?: string;
  busModelId?: string;
  fleetPrefix?: string;
  fleetNumber?: string;
  licensePlateNumber?: string;
  routerNumber?: string;
  username?: string;
};

export function buildPhotoSearchUrl(query: PhotoSearchQuery): string {
  const searchParams = new URLSearchParams(query);
  return `${SEARCH_BASE_URL}?${searchParams.toString()}`;
}
