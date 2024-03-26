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

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  VStack,
} from '@chakra-ui/react';
import {ChangeEvent, FC, useCallback} from 'react';
import {LoadingSpinner} from '../../../../components/loading-spinner';
import {ApiMultiSelect} from '../../../../components/api-multi-select';
import {CreateFormSize} from './size';
import {CreateFormViewProps} from './types';
import {CreateFormAdvertiser} from './advertiser';

export const CreateFormView: FC<CreateFormViewProps> = props => {
  const {
    isLoading,
    isSubmitting,
    multiSelectProps,
    onInputChange,
    canSubmit,
    onSubmitClick,
    screenshotSize,
    showAdvertiserId,
  } = props;

  const onInputChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const isNumberInput = event.target.type === 'number';
      const inputValue = event.target.value;
      const value = isNumberInput ? Number(inputValue) : inputValue;
      onInputChange(name, value);
    },
    [onInputChange]
  );

  const onCheckedInputChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;
      const name = event.target.name;
      onInputChange(name, value);
    },
    [onInputChange]
  );

  return (
    <>
      <VStack spacing="4">
        {/* * Form Field: Advertiser ID and toggle */}
        <CreateFormAdvertiser
          isLoading={isLoading}
          showAdvertiserId={showAdvertiserId}
          onInputChangeHandler={onInputChangeHandler}
          onCheckedInputChangeHandler={onCheckedInputChangeHandler}
        />

        {/* * Form Fields: Orders, Line Items, Creatives */}
        {multiSelectProps.map((selectProps, index) => (
          <ApiMultiSelect {...selectProps} key={index} />
        ))}

        {/* * Form Field: Website URL */}
        <FormControl isRequired isDisabled={isLoading}>
          <FormLabel>Website url</FormLabel>
          <Input
            placeholder="https://www.website.com"
            name="websiteUrl"
            onChange={onInputChangeHandler}
          />
        </FormControl>

        {/* * Form Field: Width & Height */}
        <CreateFormSize
          isLoading={isLoading}
          screenshotSize={screenshotSize}
          onInputChangeHandler={onInputChangeHandler}
          onInputChange={onInputChange}
        />

        {/* * Form Field: Toggle for identifying creatives on the page with a border */}
        <FormControl display="flex" alignItems="center" isDisabled={isLoading}>
          <FormLabel>Show a red border around creatives</FormLabel>
          <Switch
            name="identifyCreativesOnPage"
            onChange={onCheckedInputChangeHandler}
          ></Switch>
        </FormControl>

        {/* * Form Submit */}
        <Button
          mt={'4'}
          colorScheme="blue"
          isDisabled={!canSubmit}
          onClick={onSubmitClick}
          isLoading={isLoading}
        >
          Generate screenshots
        </Button>

        <LoadingSpinner isLoading={isSubmitting} />
      </VStack>
    </>
  );
};
