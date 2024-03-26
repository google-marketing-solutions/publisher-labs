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

import {ButtonProps} from '@chakra-ui/react';
import {AuthProfile} from '../../../../lib/api-client';
import {NavigationRoute} from '../../../../providers/types';

export interface SidebarProps {
  githubLink: string;
  currentRoute: NavigationRoute;
  onRouteTagClick: (clickedRoute: NavigationRoute) => void;
  profile: AuthProfile;
}

export interface SidebarRouteButtonProps {
  route: NavigationRoute;
  currentRoute: NavigationRoute;
  onRouteTagClick: (clickedRoute: NavigationRoute) => void;
}

export type SidebarRouteButtonPropsRest = Omit<
  ButtonProps,
  'onClick' | 'variant'
>;
