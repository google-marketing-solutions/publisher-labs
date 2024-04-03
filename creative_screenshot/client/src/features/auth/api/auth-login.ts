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

import {useCallback} from 'react';
import {useApiCall} from '../../../lib/api-client/hooks';

export const useLogin = () => {
  const apiCall = useApiCall<string, undefined>({
    mockGenerator: () => window.location.href,
    fetchFunction: apiClient => {
      return apiClient.getAuthLoginAuthLoginGet();
    },
  });

  const loginAndRedirect = useCallback(async () => {
    const loginUrl = await apiCall.fetchData();
    if (loginUrl) location.href = loginUrl;
  }, [apiCall]);

  return {loginAndRedirect, ...apiCall};
};
