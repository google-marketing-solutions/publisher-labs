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

import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useGetCreatives} from '../../../orders/api/get-creatives';
import {useGetLineItems} from '../../../orders/api/get-line-items';
import {useGetOrders} from '../../../orders/api/get-orders';
import {CreateFormView} from './view';
import {useApiMultSelect} from '../../../../components/api-multi-select/hooks';
import {CreateFormProps, CreateFormValues, CreateFormSizeType} from './types';
import {LineItem, Creative, Order} from '../../../../lib/api-client';

export const CreateForm: FC<CreateFormProps> = props => {
  const {onFormSubmit, isSubmitting} = props;

  const getOrders = useGetOrders();
  const getLineItems = useGetLineItems();
  const getCreatives = useGetCreatives();

  const [form, setForm] = useState<CreateFormValues>({
    websiteUrl: '',
    orderIds: [],
    lineItemIds: [],
    creativeIds: [],
    advertiserId: undefined,
    screenshotSizeHeight: undefined,
    screenshotSizeWidth: undefined,
    identifyCreativesOnPage: false,
    screenshotSize: CreateFormSizeType.FULLSIZE,
    showAdvertiserId: false,
  });

  const onSetup = () => {
    getOrders.fetchData();
  };

  const onFormAdvertiserIdsChange = () => {
    if (!form.advertiserId) return;
    getOrders.fetchData(form.advertiserId);
  };

  const onFormOrderIdsChange = () => {
    if (!form.orderIds.length) return;
    for (const orderId of form.orderIds) {
      getLineItems.fetchData(orderId);
    }
  };

  const onFormLineItemIdsChange = () => {
    if (!form.lineItemIds.length) return;
    for (const lineItemId of form.lineItemIds) {
      getCreatives.fetchData(lineItemId);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onSetup, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onFormAdvertiserIdsChange, [form.advertiserId]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onFormOrderIdsChange, [form.orderIds]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onFormLineItemIdsChange, [form.lineItemIds]);

  const onInputChange = useCallback(
    (
      key: keyof CreateFormValues | string,
      value: string | number | boolean | number[]
    ) => {
      setForm(form => {
        if (key in form) return {...form, [key]: value};
        throw new Error(`Key ${key} not in form object`);
      });
    },
    []
  );

  const isLoading = useMemo(() => {
    return (
      isSubmitting ||
      getOrders.isLoading ||
      getLineItems.isLoading ||
      getCreatives.isLoading
    );
  }, [
    getCreatives.isLoading,
    getLineItems.isLoading,
    getOrders.isLoading,
    isSubmitting,
  ]);

  const orderSelect = useApiMultSelect<Order>({
    title: 'Order(s)',
    isLoading,
    data: getOrders.data,
    values: form['orderIds'],
    onChange: value => onInputChange('orderIds', value),
  });

  const lineItemSelect = useApiMultSelect<LineItem>({
    values: form['lineItemIds'],
    title: 'Line Item(s)',
    onChange: value => onInputChange('lineItemIds', value),
    isLoading,
    data: getLineItems.dataHistory ?? getOrders.data,
  });

  const creativeSelect = useApiMultSelect<Creative>({
    title: 'Creative(s)',
    values: form['creativeIds'],
    onChange: value => onInputChange('creativeIds', value),
    isLoading,
    data: getCreatives.dataHistory ?? getOrders.data,
  });

  return (
    <CreateFormView
      multiSelectProps={[orderSelect, lineItemSelect, creativeSelect]}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onInputChange={onInputChange}
      canSubmit={!!form.creativeIds.length}
      screenshotSize={form.screenshotSize}
      showAdvertiserId={form.showAdvertiserId}
      onSubmitClick={() =>
        onFormSubmit(form, {
          creativeDataHistory: getCreatives.dataHistory,
        })
      }
    />
  );
};
