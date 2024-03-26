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
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useGetAuthProfile} from '../features/auth/api/get-profile';
import {AuthPage} from '../features/auth/components/auth-page';
import {MainDashboard} from '../features/misc/components/main-dashboard';
import {Sidebar} from '../features/misc/components/sidebar';
import {NavigationRoute} from './types';

export const AppProvider = () => {
  const getProfile = useGetAuthProfile();

  const [currentRoute, setCurrentRoute] =
    useState<NavigationRoute>('create-screenshots');

  const onSetup = () => {
    getProfile.fetchData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onSetup, []);

  if (getProfile.isLoading) return <Spinner />;
  if (!getProfile.data) return <AuthPage />;

  return (
    <Flex height={'100vh'}>
      <Sidebar
        githubLink="github.com"
        currentRoute={currentRoute}
        onRouteTagClick={setCurrentRoute}
        profile={getProfile.data}
      />
      <Box bgColor={'gray.100'} flexGrow={'1'} overflow={'auto'}>
        <Container maxW="container.xl" mt="16">
          <Card p={'4'} width={'80%'}>
            <CardHeader>
              <Heading size="lg">Screenshots</Heading>
            </CardHeader>
            <CardBody>
              <MainDashboard
                currentRoute={currentRoute}
                onScreenshotsCreate={() => setCurrentRoute('view-screenshots')}
              />
            </CardBody>
          </Card>
        </Container>
      </Box>
    </Flex>
  );
};
