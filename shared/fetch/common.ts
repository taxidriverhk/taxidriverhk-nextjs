import axios, { AxiosError } from "axios";

export type ItemNotFoundResponse = {
  notFound?: boolean;
};

export async function getAsync<T>(endpoint: string, params: any) {
  const response = await axios.get<T>(endpoint, {
    params,
  });
  const { data } = response;
  return data;
}

export async function getWithItemNotFoundHandledAsync<T>(
  endpoint: string,
  params: any
): Promise<T | ItemNotFoundResponse> {
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
