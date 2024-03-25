const DEV_API_ENDPOINT = "http://localhost:8081/hkadbus2/api";
const PROD_API_ENDPOINT = "http://127.0.0.1:8080/hkadbus2/api";

export function getApiEndpoint(): string {
  const endpointOverride = process.env.HKADBUS2_API_ENDPOINT;
  const isDev = process.env.NODE_ENV === "development";

  if (endpointOverride != null) {
    return endpointOverride;
  }
  return isDev ? DEV_API_ENDPOINT : PROD_API_ENDPOINT;
}
