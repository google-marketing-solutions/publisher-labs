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

import {VStack, FormControl, FormLabel, Input, Switch} from '@chakra-ui/react';
import {FC} from 'react';
import {CreateFormAdvertiserProps} from './types';

export const CreateFormAdvertiser: FC<CreateFormAdvertiserProps> = props => {
  const {
    isLoading,
    showAdvertiserId,
    onInputChangeHandler,
    onCheckedInputChangeHandler,
  } = props;

  return (
    <VStack spacing="4" width={'100%'}>
      <FormControl isRequired isDisabled={isLoading || !showAdvertiserId}>
        <FormLabel>Advertiser</FormLabel>
        <Input
          type="number"
          placeholder="Advertiser ID"
          name="advertiserId"
          onChange={onInputChangeHandler}
        />
      </FormControl>
      <FormControl
        display="flex"
        alignItems="center"
        isDisabled={isLoading}
        size="sm"
      >
        <FormLabel size="sm">Filter by Advertiser</FormLabel>
        <Switch
          size="sm"
          name="showAdvertiserId"
          onChange={onCheckedInputChangeHandler}
        ></Switch>
      </FormControl>
    </VStack>
  );
};
