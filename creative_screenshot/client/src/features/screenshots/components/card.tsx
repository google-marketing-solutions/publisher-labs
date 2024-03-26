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
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Link,
  Tag,
} from '@chakra-ui/react';
import {FC} from 'react';
import {ScreenshotCardProps} from '../types';
import {ScreenshotCardCreative} from './creative';

export const ScreenshotCard: FC<ScreenshotCardProps> = props => {
  const {title, screenshot} = props;

  return (
    <Card variant="outline">
      <CardBody>
        <Link href={screenshot.screenshotImageUrl} target="_blank">
          <Image
            borderRadius="lg"
            width="100%"
            maxH="300px"
            objectFit="contain"
            src={screenshot.screenshotImageUrl}
            background="black"
            fallback={<Tag colorScheme="red">Broken image!</Tag>}
          />
        </Link>
        <Heading my="4" size="md">
          {title}
        </Heading>
        <ScreenshotCardCreative creative={screenshot.creative} />
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <a href={screenshot.screenshotImageUrl} target="_blank">
            <Button size="sm" variant="solid">
              View screenshot
            </Button>
          </a>
          <a href={screenshot.websiteInPreviewUrl} target="_blank">
            <Button size="sm" variant="outline">
              View preview
            </Button>
          </a>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
