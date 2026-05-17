import { getApiEndpoint as getFastifyApiEndpoint } from "shared/config/fastify-config";

export function getApiEndpoint(): string {
  return `${getFastifyApiEndpoint()}/hkadbus2`;
}
