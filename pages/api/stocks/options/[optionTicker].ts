import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getApiEndpoint as getCachedApiEndpoint } from "shared/config/cs-map-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    res.status(404).send({});
  }

  const { query } = req;
  const { optionTicker, apiKey } = query;
  if (
    typeof optionTicker !== "string" ||
    optionTicker.trim().length === 0 ||
    typeof apiKey !== "string" ||
    apiKey.trim().length === 0
  ) {
    res.status(400).send({});
  }

  try {
    const { data } = await axios.get<any>(
      `${getCachedApiEndpoint()}/stocks/options/${optionTicker}`,
      {
        params: {
          apiKey,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    const axiosError = error as AxiosError;
    res
      .status(axiosError?.response?.status ?? 500)
      .send({});
  }
}
