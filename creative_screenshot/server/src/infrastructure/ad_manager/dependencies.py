"""
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
 """

from fastapi import Depends

from config import get_config, Config
from infrastructure.ad_manager.service import AdManagerClient
from routes.auth.dependencies import get_auth_credentials, Credentials

from googleads import oauth2

def get_ad_manager_client(
  config: Config = Depends(get_config),
  credentials: Credentials = Depends(get_auth_credentials),
):
  """
    Returns an AdManagerClient instance.

    Args:
      config: The application configuration.
      credentials: The user credentials.
    """
  oauth2_client = oauth2.GoogleRefreshTokenClient(
    client_id=config.google_cloud_client_id,
    client_secret=config.google_cloud_client_secret,
    refresh_token=credentials.refresh_token)

  return AdManagerClient(
      oauth2_client,
      network_code=config.ad_manager_network_code,
      application_name=config.ad_manager_application_name)
