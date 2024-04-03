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

/**
 * Generated types from the backend open api's spec
 * can be generated, and should be done before using or building
 * this project.
 * yarn generate-api-client
 * /generated/ folder
 */

/* eslint-disable node/no-unpublished-import */
import {DefaultService as ApiClientTypes} from '../../../generated';

export {ApiClientTypes};
export * from '../../../generated';

export type UseApiCallOptions<R, A> = {
  fetchFunction: (apiClient: ApiClientTypes, args: A) => Promise<R>;
  mockGenerator?: (args: A) => R;
};

export type UseApiCallReturn<R, A> = {
  isLoading: boolean;
  error: unknown;
  data: R | undefined;
  fetchData: (args?: A | undefined) => Promise<R | undefined>;
  fetchMockData: (args?: A | undefined) => Promise<R | undefined>;
  dataHistory: R[];
};
