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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import {FC} from 'react';
import {CreateFormSizeProps, CreateFormSizeType} from './types';

export const CreateFormSize: FC<CreateFormSizeProps> = props => {
  const {isLoading, screenshotSize, onInputChangeHandler, onInputChange} =
    props;

  return (
    <>
      <FormControl isDisabled={isLoading}>
        <FormLabel>Screenshot size</FormLabel>
        <RadioGroup
          onChange={value => onInputChange('screenshotSize', value)}
          value={screenshotSize}
        >
          <Stack direction="row">
            <Radio value={CreateFormSizeType.FULLSIZE}>Fullsize</Radio>
            <Radio value={CreateFormSizeType.CUSTOM}>Custom</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <div
        style={{
          display:
            screenshotSize !== CreateFormSizeType.FULLSIZE ? 'flex' : 'none',
        }}
      >
        <Stack direction={'row'}>
          <FormControl isDisabled={isLoading}>
            <NumberInput
              name="screenshotSizeWidth"
              onInput={onInputChangeHandler}
            >
              <NumberInputField placeholder="width" />
            </NumberInput>
          </FormControl>
          <FormControl isDisabled={isLoading}>
            <NumberInput
              name="screenshotSizeHeight"
              onInput={onInputChangeHandler}
            >
              <NumberInputField placeholder="height" />
            </NumberInput>
          </FormControl>
        </Stack>
      </div>
    </>
  );
};
