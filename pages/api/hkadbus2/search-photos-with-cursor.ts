import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSearchPhotos } from "shared/fetch/hkadbus2";
import {
  SearchPhotoQuery,
  SearchPhotosResponse,
  SortOrder,
} from "shared/types/hkadbus2-types";

export type SearchPhotoWithCursorRequest = {
  searchQuery: SearchPhotoQuery;
  orderBy: string;
  cursor: string;
  sort: SortOrder;
  locale: string;
  size: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchPhotosResponse>
) {
  if (req.method !== "POST") {
    res.status(404);
  }

  const {
    body: { params },
  } = req;
  const { searchQuery, orderBy, sort, locale, cursor } =
    params as SearchPhotoWithCursorRequest;

  const response = await fetchSearchPhotos(
    searchQuery,
    orderBy,
    sort,
    locale,
    cursor
  );
  res.status(200).json(response);
}
