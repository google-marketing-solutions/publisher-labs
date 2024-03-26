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
import {
  Creative,
  Screenshot,
  ScreenshotCreateInput,
} from '../../../../lib/api-client';
import {ScreenshotCardData} from '../../../screenshots/types';
import {CreateFormValues} from '../create-form/types';
import {API_CLIENT_ENDPOINT} from '../../../../lib/api-client/client';

export const filterSelectedFetchedCreatves = (
  dataHistory: Creative[][],
  selectedCreativeIds: number[]
): Creative[] => {
  /** Get a join from the fetched creatives, filtering by selected creatives */
  const filteredCreatives = (dataHistory ?? [])
    .flat()
    .filter(creative => selectedCreativeIds.includes(creative.id));
  return uniqBy(filteredCreatives, creative => creative.id);
};

export const formToScreenshotApiInput = (
  values: CreateFormValues,
  creative: Creative
): ScreenshotCreateInput => {
  return {
    creative_id: creative.id,
    line_item_id: creative.line_item_id,
    website_url: values.websiteUrl,
    height: values.screenshotSizeHeight,
    width: values.screenshotSizeWidth,
    identify_creatives: values.identifyCreativesOnPage,
  };
};

export const screenshotApiOutputToScreenshotCard = (
  screenshot: Screenshot,
  creative: Creative
): ScreenshotCardData => {
  return {
    creative: {
      id: creative.id,
      lineItemId: creative.line_item_id,
      advertiserId: creative.advertiser_id,
      height: creative.height,
      name: creative.name,
      status: creative.status,
      width: creative.width,
    },
    websiteInPreviewUrl: screenshot.in_website_url,
    screenshotImageUrl: `${API_CLIENT_ENDPOINT}/screenshot/${screenshot.screenshot_id}`,
  };
};
