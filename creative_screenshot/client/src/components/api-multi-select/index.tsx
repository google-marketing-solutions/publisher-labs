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

import {FormControl, FormLabel, Stack, Button, Box} from '@chakra-ui/react';
import {Select} from 'chakra-react-select';
import {FC} from 'react';
import {ApiMultiSelectProps, ApiMultiSelectRest} from './types';

/**
 * React component for handling API options to a dynamic multi-select
 * Uses 'chakra-react-select' under the hood
 */
export const ApiMultiSelect: FC<
  ApiMultiSelectProps & ApiMultiSelectRest
> = props => {
  const {
    isLoading,
    title,
    onSelectAllClick,
    onChange,
    value,
    options,
    ...rest
  } = props;

  return (
    <FormControl {...rest} isRequired isDisabled={isLoading}>
      <FormLabel>{title}</FormLabel>
      <Stack direction={'row'} alignItems={'center'}>
        <Box width="full">
          <Select
            isMulti
            isClearable
            options={options}
            value={value}
            onChange={value => {
              const values = value.map(x => x.value) as number[];
              onChange(values);
            }}
            isLoading={isLoading}
          />
        </Box>
        <Button
          isDisabled={isLoading}
          size={'sm'}
          colorScheme="blue"
          variant={'ghost'}
          onClick={onSelectAllClick}
        >
          Select all
        </Button>
      </Stack>
    </FormControl>
  );
};
