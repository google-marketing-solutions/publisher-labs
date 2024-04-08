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
  Container,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import {GoogleIcon, GitHubIcon} from './icons';
import {useLogin} from '../api/auth-login';

export const AuthPage = () => {
  const getLogin = useLogin();

  const onGoogleContinueClick = () => {
    getLogin.loginAndRedirect();
  };

  return (
    <Container maxW="md" py="24">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing="2" textAlign="center">
            <Heading size="lg">Creative screenshot tool</Heading>
            <Text color="muted">Log in to your Google Ad Manager account</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="3">
            <Button
              isLoading={getLogin.isLoading}
              variant="solid"
              leftIcon={<GoogleIcon />}
              onClick={onGoogleContinueClick}
            >
              Continue with Google
            </Button>
            <Divider my="2" />
            <Link
              href="https://github.com/google-marketing-solutions/publisher-labs"
              target="_blank"
              width={'100%'}
            >
              <Button variant="ghost" leftIcon={<GitHubIcon />}>
                View on GitHub
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
