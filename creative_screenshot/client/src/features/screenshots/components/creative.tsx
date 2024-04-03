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

import {TableContainer, Table, Tbody, Tr, Td, Tag} from '@chakra-ui/react';
import {FC} from 'react';
import {ScreenshotCardCreativeProps} from '../types';

export const ScreenshotCardCreative: FC<
  ScreenshotCardCreativeProps
> = props => {
  const {creative} = props;

  return (
    <TableContainer>
      <Table size="sm" variant={'stripped'}>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>
              <Tag>{creative.name}</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>ID</Td>
            <Td isNumeric>
              <Tag>{creative.id}</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>Status</Td>
            <Td>
              <Tag>{creative.status}</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>Size</Td>
            <Td>
              <Tag>
                {creative.width}x{creative.height}
              </Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>Line Item</Td>
            <Td isNumeric>
              <Tag>{creative.lineItemId}</Tag>
            </Td>
          </Tr>
          <Tr>
            <Td>Advertiser</Td>
            <Td isNumeric>
              <Tag>{creative.advertiserId}</Tag>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
