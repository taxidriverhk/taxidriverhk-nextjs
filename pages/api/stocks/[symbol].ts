import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getApiEndpoint as getCachedApiEndpoint } from "shared/config/cs-map-config";
import { GetStockDataResponse } from "shared/types/passive-income-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStockDataResponse>
) {
  if (req.method !== "GET") {
    res.status(404).send({} as GetStockDataResponse);
  }

  const { query } = req;
  const { symbol, apiKey } = query;
  if (
    typeof symbol !== "string" ||
    symbol.trim().length === 0 ||
    typeof apiKey !== "string" ||
    apiKey.trim().length === 0
  ) {
    res.status(400).send({} as GetStockDataResponse);
  }

  try {
    const { data } = await axios.get<GetStockDataResponse>(
      `${getCachedApiEndpoint()}/stocks/${symbol}`,
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
      .send({} as GetStockDataResponse);
  }
}
