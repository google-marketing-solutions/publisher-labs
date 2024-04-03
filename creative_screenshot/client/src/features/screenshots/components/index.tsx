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

import {SimpleGrid} from '@chakra-ui/react';
import {FC} from 'react';
import {ScreenshotCard} from './card';
import {ScreenshotsGridProps} from '../types';

export const ScreenshotsGrid: FC<ScreenshotsGridProps> = props => {
  const {screenshots} = props;

  if (!screenshots.length) {
    return <div>No screenshots created yet!</div>;
  }

  return (
    <SimpleGrid columns={2} spacing={10}>
      {screenshots.map((screenshot, index) => {
        return (
          <ScreenshotCard
            key={index}
            screenshot={screenshot}
            title={`Screenshot ${screenshot.creative.name}`}
          />
        );
      })}
    </SimpleGrid>
  );
};
