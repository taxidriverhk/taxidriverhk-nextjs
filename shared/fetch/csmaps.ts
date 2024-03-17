import {
  mapCategories,
  mapItems,
  mapTutorials,
} from "shared/config/cs-map-config";
import {
  GetMapsResponse,
  MapItem,
  MapTutorial,
} from "shared/types/cs-map-types";

type Nullable<T> = T | null | undefined;

export async function getMapsAsync(): Promise<GetMapsResponse> {
  // TODO: replace with real database queries
  // (e.g. maps should not contain images)
  return {
    categories: mapCategories,
    maps: mapItems,
  };
}

export async function getMapAsync(
  mapNameOrId: string
): Promise<Nullable<MapItem>> {
  // TODO: replace with real database query
  let map = null;
  const idNumber = parseInt(mapNameOrId, 10);
  if (Number.isNaN(idNumber)) {
    map = mapItems.find(
      (mapItem) => mapItem.name === mapNameOrId.toLowerCase()
    );
  } else {
    map = mapItems.find((mapItem) => mapItem.id === idNumber);
  }

  return map;
}

export async function getTutorialsAsync(): Promise<Array<MapTutorial>> {
  // TODO: replace with real database query
  return mapTutorials;
}

export async function getTutorialAsync(
  id: string
): Promise<Nullable<MapTutorial>> {
  // TODO: replace with real database query
  const tutorial = mapTutorials.find(
    (tutorial) => tutorial.hashKey === id.toLowerCase()
  );
  const showDraft = process.env.NODE_ENV === "development";
  if (tutorial == null || (!showDraft && tutorial.isDraft)) {
    return null;
  }

  return tutorial;
}
