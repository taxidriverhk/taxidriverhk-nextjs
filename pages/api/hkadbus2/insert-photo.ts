import type { NextApiRequest, NextApiResponse } from "next";
import { insertPhotoAsync } from "shared/fetch/hkadbus2";
import { PutPhotoRequest, PutPhotoResponse } from "shared/types/hkadbus2-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PutPhotoResponse>
) {
  if (req.method !== "POST") {
    res.status(404);
  }

  const {
    body,
    headers: { authorization },
  } = req;
  const payload = body as PutPhotoRequest;

  if (authorization != null) {
    const response = await insertPhotoAsync(authorization, payload);
    res.status(200).json(response);
  } else {
    res.status(401);
  }
}
