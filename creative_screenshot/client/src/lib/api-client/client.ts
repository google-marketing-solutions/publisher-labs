/*
 Copyright 2024 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

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
