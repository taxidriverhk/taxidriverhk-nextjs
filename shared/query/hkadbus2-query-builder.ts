import type { SearchPhotoQuery } from "shared/types/hkadbus2-types";

const SEARCH_BASE_URL = "search";

export function buildPhotoSearchUrl(query: SearchPhotoQuery): string {
  const searchParams = new URLSearchParams(query);
  return `${SEARCH_BASE_URL}?${searchParams.toString()}`;
}

type ObjectWithUndefinedValue = { [key: string]: string | null | undefined };

export function removeUndefinedAndLowercaseValues(
  input: ObjectWithUndefinedValue
): ObjectWithUndefinedValue {
  return Object.entries(input).reduce((result, [key, value]) => {
    if (value != null && value.length > 0) {
      return {
        ...result,
        [key]: value.toLowerCase(),
      };
    }
    return result;
  }, {});
}
