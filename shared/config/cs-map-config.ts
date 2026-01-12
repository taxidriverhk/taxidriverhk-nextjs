const DEV_API_ENDPOINT = "http://localhost:8090";

export function getApiEndpoint(): string {
  const isDev = process.env.NODE_ENV === "development";
  const prodApiEndpoint = process.env.CSMAPS_API_ENDPOINT;
  if (!isDev && prodApiEndpoint == null) {
    throw Error("CS maps API endpoint is not defined");
  }
  return isDev ? DEV_API_ENDPOINT : (prodApiEndpoint as string);
}
