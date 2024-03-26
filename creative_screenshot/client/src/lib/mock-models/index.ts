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
  AuthProfile,
  Creative,
  LineItem,
  Order,
  Screenshot,
} from '../api-client';
import {mockArray, mockRandomId} from './utils';

export * from './utils';

export const mockCreatives = (lineItemId: number): Creative[] => {
  const lineItemIdShrinked = lineItemId.toString().slice(0, 4);
  return mockArray(5, index => {
    return {
      id: mockRandomId(),
      name: `Creative ${lineItemIdShrinked}-${index + 1}`,
      line_item_id: lineItemId,
      advertiser_id: mockRandomId(),
      width: 400,
      height: 250,
      status: 'MOCK',
    };
  });
};

export const mockLineItems = (orderId: number): LineItem[] => {
  const OrderIdShrinked = orderId.toString().slice(0, 4);
  return mockArray(5, index => {
    return {
      id: mockRandomId(),
      name: `Line item ${OrderIdShrinked}-${index + 1}`,
    };
  });
};

export const mockScreenshot = (): Screenshot => {
  return {
    in_website_url: 'https://google.com',
    screenshot_id: 'xxx-yyy-1920x1080-True',
  };
};

export const mockAuthProfile = (): AuthProfile => {
  return {name: 'John Doe', picture: 'https://placehold.co/100'};
};

export const mockOrders = (): Order[] => {
  return mockArray(5, index => {
    return {
      id: mockRandomId(),
      name: `Order ${index + 1}`,
    };
  });
};
