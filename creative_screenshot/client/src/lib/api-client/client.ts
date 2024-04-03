import {ApiClient} from './index';

export const API_CLIENT_ENDPOINT = 'http://localhost:8080';

/**
 * Create an API client from the generate typescript files
 * Run 'yarn generate-api-client' before using this project
 * @returns
 */
export const createApiClient = () => {
  return new ApiClient({
    BASE: API_CLIENT_ENDPOINT,
    CREDENTIALS: 'include',
    WITH_CREDENTIALS: true,
  }).default;
};
