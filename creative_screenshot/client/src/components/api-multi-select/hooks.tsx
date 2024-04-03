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

import uniqBy from 'lodash.uniqby';
import {ApiMultiSelectProps, UseApiMultiSelectOptions} from './types';
import {useCallback, useMemo} from 'react';

export const useApiMultSelect = <R extends {id: number; name: string}>(
  _options: UseApiMultiSelectOptions<R>
): ApiMultiSelectProps => {
  const {data, isLoading, values, onChange, title} = _options;

  const dataToOptions = useCallback((data: R[]) => {
    return (data ?? []).map(order => {
      return {
        value: order.id,
        label: order.name,
      };
    });
  }, []);

  const getData = useCallback((): R[] => {
    if (!data || !data?.[0]) return [];
    const is2D = Array.isArray(data[0]);
    const duppedItems: R[] = (is2D ? data.flat() : data) as R[];
    return uniqBy(duppedItems, 'id');
  }, [data]);

  const options = useMemo(() => {
    return dataToOptions(getData());
  }, [dataToOptions, getData]);

  const onSelectAllClick = () => {
    const is2D = Array.isArray(data?.[0]);
    console.log(
      'test',
      !data,
      !data?.[0],
      Array.isArray(data?.[0]),
      is2D ? data?.flat?.() : data
    );
    const allValues = getData().map(x => x.id);
    onChange(allValues);
  };

  const value = useMemo(() => {
    return options.filter(x => values.includes(x.value));
  }, [options, values]);

  return {
    title,
    isLoading,
    onSelectAllClick,
    onChange,
    options,
    value,
  };
};
