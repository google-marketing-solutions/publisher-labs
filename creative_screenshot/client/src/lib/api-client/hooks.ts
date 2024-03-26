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

import {useConst} from '@chakra-ui/react';
import {useCallback, useState} from 'react';
import {createApiClient} from './client';
import {awaitedTimeout} from './utils';
import {UseApiCallOptions, UseApiCallReturn} from './types';

// false: Use real API request, true, Use the mockGenerators
export const DEBUG_IS_MOCK_MODE =
  process.env['MOCK_MODE'] === 'TRUE' ? true : false;
// How long to wait for each mock request
export const MOCK_FAKE_DELAY_TIME = 1000;

/**
 * React hook that should be used to fetch data
 * In mock mode, network requests are instead mocked by placeholder functions
 * In default mode, data is fetched from this project's backend part, using
 * a generated api client from the openapi spec
 */
export const useApiCall = <R, A>(
  options: UseApiCallOptions<R, A>
): UseApiCallReturn<R, A> => {
  const {mockGenerator, fetchFunction} = options;

  const apiClient = useConst(createApiClient());

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<R | undefined>(undefined);
  const [dataHistory, setDataHistory] = useState<R[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const onFetchError = useCallback((error: unknown) => {
    console.error(error);
    setError(JSON.stringify(error));
    setData(undefined);
    setIsLoading(false);
  }, []);

  const onFetchData = useCallback((newData: R): R => {
    setData(newData);
    setError(undefined);
    setIsLoading(false);
    setDataHistory(previous => previous.concat([newData]));
    return newData;
  }, []);

  const fetchMockData = useCallback(
    async (args?: A) => {
      setIsLoading(true);
      await awaitedTimeout(MOCK_FAKE_DELAY_TIME);
      const responseData = await mockGenerator?.(
        // Same as below
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /**@ts-ignore */
        args
      );
      if (!responseData) throw new Error('No valid mock data found');
      return onFetchData(responseData);
    },
    [mockGenerator, onFetchData]
  );

  const fetchData = useCallback(
    async (args?: A) => {
      if (DEBUG_IS_MOCK_MODE) return fetchMockData();

      try {
        setIsLoading(true);
        const responseData = await fetchFunction(
          apiClient,
          /**
           * Warning! ts-ignore because of weird generetics and typings
           */
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /**@ts-ignore */
          args
        );
        return onFetchData(responseData);
      } catch (error) {
        onFetchError(error);
        return;
      }
    },
    [apiClient, fetchFunction, fetchMockData, onFetchData, onFetchError]
  );

  return {
    isLoading,
    error,
    data,
    dataHistory,
    fetchData,
    fetchMockData,
  };
};
