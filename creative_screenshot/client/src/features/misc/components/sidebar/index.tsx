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
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import {FC} from 'react';
import {FiGrid, FiLogOut, FiPlus} from 'react-icons/fi';
import {useAuthClear} from '../../../auth/api/auth-clear';
import {GitHubIcon} from '../../../auth/components/icons';
import {SidebarButton, SidebarRouteButton} from './buttons';
import {SidebarProps} from './types';

export const Sidebar: FC<SidebarProps> = props => {
  const {
    currentRoute: currentNavigationRoute,
    onRouteTagClick,
    profile,
  } = props;

  const authClear = useAuthClear();

  return (
    <Stack
      flex="1"
      maxW="xs"
      py="4"
      px="2"
      bgColor="gray.50"
      borderRightWidth="1px"
      justifyContent="space-between"
    >
      <Stack spacing="8">
        <Stack spacing="2">
          <Heading my={'2'} size={'md'} mx="4">
            Creative Screenshot Tool
          </Heading>
          <Divider mb="2"></Divider>
          <SidebarRouteButton
            leftIcon={<FiPlus />}
            route="create-screenshots"
            currentRoute={currentNavigationRoute}
            onRouteTagClick={onRouteTagClick}
          >
            Create screenshot(s)
          </SidebarRouteButton>
          <SidebarRouteButton
            leftIcon={<FiGrid />}
            route="view-screenshots"
            currentRoute={currentNavigationRoute}
            onRouteTagClick={onRouteTagClick}
          >
            View recent
          </SidebarRouteButton>
        </Stack>
      </Stack>
      <Stack spacing="4">
        <Divider></Divider>
        <Link
          href="https://github.com/google-marketing-solutions/publisher-labs"
          target="_blank"
          width={'100%'}
        >
          <SidebarButton leftIcon={<GitHubIcon />}>
            View on Github
          </SidebarButton>
        </Link>
        <Divider></Divider>
        <SidebarButton
          leftIcon={<FiLogOut />}
          onClick={() => authClear.fetchData()}
        >
          Logout
        </SidebarButton>
        <Divider />
        <HStack spacing="3" justify="flex-start">
          <Avatar boxSize="10" src={profile.picture} />
          <Box>
            <Text textStyle="sm" fontWeight="medium">
              {profile.name}
            </Text>
          </Box>
        </HStack>
      </Stack>
    </Stack>
  );
};
