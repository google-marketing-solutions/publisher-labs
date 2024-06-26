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

import {Button, ButtonProps} from '@chakra-ui/react';
import {FC} from 'react';
import {SidebarRouteButtonProps, SidebarRouteButtonPropsRest} from './types';

export const SidebarButton: FC<ButtonProps> = props => {
  return (
    <Button
      variant="ghost"
      justifyContent="start"
      iconSpacing="3"
      fontWeight={500}
      {...props}
    />
  );
};

export const SidebarRouteButton: FC<
  SidebarRouteButtonProps & SidebarRouteButtonPropsRest
> = props => {
  const {route, currentRoute, onRouteTagClick, ...rest} = props;

  return (
    <Button
      variant="ghost"
      justifyContent="start"
      iconSpacing="3"
      fontWeight={500}
      {...rest}
      {...(currentRoute === route && {variant: 'solid'})}
      onClick={() => onRouteTagClick(route)}
    />
  );
};
