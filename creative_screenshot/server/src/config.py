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

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

WEB_CLIENT_REDIRECT_URL = "http://localhost:5000"

class Config(BaseSettings):
  """
  Configuration used for some constants
  and the values in the .env file
  """
  ad_manager_application_name: str
  ad_manager_network_code: int

  google_cloud_client_id: str
  google_cloud_client_secret: str

  model_config = SettingsConfigDict(
    env_file=".env", env_file_encoding="utf-8", extra="allow"
  )

  google_oauth_scopes: str = (
    "https://www.googleapis.com/auth/"
    + "dfp%20https://www.googleapis.com/auth/userinfo.profile"
  )

  web_client_redirect_url: str | None = WEB_CLIENT_REDIRECT_URL


@lru_cache
# Cache the config object, so read is not done on every api request
def get_config():
  return Config()
