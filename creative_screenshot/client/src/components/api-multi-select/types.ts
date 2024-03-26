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

import {FormControlProps} from '@chakra-ui/react';

/**
 * Props interface for the ApiMultiSelect component
 * This component uses the chakra-react-select component under the hood
 * standartized for our current setup with form handlers and API data structure
 */
export interface ApiMultiSelectProps {
  isLoading: boolean;
  title: string;
  onSelectAllClick: () => void;
  onChange: (values: number[]) => void;
  options: {value: number; label: string}[];
  value: {value: number; label: string}[];
}

/**
 * Options interface for calling the useApiMultiSelect hooks
 * R (single item of array) Return type for useApiCall
 */
export interface UseApiMultiSelectOptions<R> {
  isLoading: boolean;
  data: R[][] | R[] | undefined;
  values: number[];
  title: string;
  onChange: (values: number[]) => void;
}

export type ApiMultiSelectRest = Omit<FormControlProps, 'onChange'>;
