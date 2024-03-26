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

import {ChangeEvent} from 'react';
import {ApiMultiSelectProps} from '../../../../components/api-multi-select/types';
import {Creative} from '../../../../lib/api-client';

export interface CreateFormPropsFormSubmitContext {
  creativeDataHistory: Creative[][];
}

export interface CreateFormProps {
  isSubmitting: boolean;
  onFormSubmit: (
    values: CreateFormValues,
    context: CreateFormPropsFormSubmitContext
  ) => void;
}

export interface CreateFormValues {
  websiteUrl: string;
  orderIds: number[];
  lineItemIds: number[];
  creativeIds: number[];
  advertiserId: number | undefined;
  screenshotSizeHeight: number | undefined;
  screenshotSizeWidth: number | undefined;
  identifyCreativesOnPage: boolean;
  screenshotSize: CreateFormSizeType;
  showAdvertiserId: boolean;
}

export enum CreateFormSizeType {
  FULLSIZE = 'fullsize',
  CUSTOM = 'custom',
}

export interface CreateFormViewProps {
  multiSelectProps: ApiMultiSelectProps[];
  isSubmitting: boolean;
  isLoading: boolean;
  canSubmit: boolean;
  screenshotSize: CreateFormSizeType;
  showAdvertiserId: boolean;
  onSubmitClick: () => void;
  onInputChange: (
    key: keyof CreateFormValues | string,
    value: string | boolean | number | number[]
  ) => void;
}

export interface CreateFormSizeProps {
  isLoading: boolean;
  screenshotSize: CreateFormSizeType;
  onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onInputChange: CreateFormViewProps['onInputChange'];
}

export interface CreateFormAdvertiserProps {
  isLoading: boolean;
  showAdvertiserId: boolean;
  onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckedInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
