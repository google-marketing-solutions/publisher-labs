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

import {FC, useCallback, useEffect, useState} from 'react';
import {useCreateScreenshot} from '../../../screenshots/api/create-screenshot';
import {ScreenshotCardData} from '../../../screenshots/types';
import {CreateForm} from '../create-form';
import {MainDashboardProps} from './types';
import {
  filterSelectedFetchedCreatves,
  formToScreenshotApiInput,
  screenshotApiOutputToScreenshotCard,
} from './utils';
import {ScreenshotsGrid} from '../../../screenshots/components';
import {CreateFormProps} from '../create-form/types';

export const MainDashboard: FC<MainDashboardProps> = props => {
  const {currentRoute, onScreenshotsCreate} = props;

  const createScreenshot = useCreateScreenshot();

  const [screenshots, setScreenshots] = useState<ScreenshotCardData[]>([]);

  const onScreenshotsChange = () => {
    if (screenshots.length) onScreenshotsCreate();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onScreenshotsChange, [screenshots]);

  const onCreateFormSubmit: CreateFormProps['onFormSubmit'] = useCallback(
    async (values, context) => {
      const screenshots: ScreenshotCardData[] = [];
      const creativesFromForm = filterSelectedFetchedCreatves(
        context.creativeDataHistory,
        values.creativeIds
      );
      for (const creative of creativesFromForm) {
        const inputData = formToScreenshotApiInput(values, creative);
        const screenshot = await createScreenshot.fetchData(inputData);
        if (!screenshot) {
          throw new Error(
            'Something went wrong while fetching creating a screenshot'
          );
        }
        const screenshotCardData = screenshotApiOutputToScreenshotCard(
          screenshot,
          creative
        );
        screenshots.push(screenshotCardData);
      }
      setScreenshots(screenshots);
    },
    [createScreenshot]
  );

  if (currentRoute === 'create-screenshots')
    return (
      <CreateForm
        onFormSubmit={onCreateFormSubmit}
        isSubmitting={createScreenshot.isLoading}
      />
    );

  return <ScreenshotsGrid screenshots={screenshots} />;
};
