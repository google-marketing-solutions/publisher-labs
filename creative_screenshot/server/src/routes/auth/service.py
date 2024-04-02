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

from routes.auth.schemas import Credentials, AuthProfile

from config import Config

import requests


def get_login_url(redirect_url: str, config: Config) -> str:
  """
  Get a Google generated OAuth2 authentification  url that a client can use.
  Redirect URI should be a callback in this project, found below
  Scopes are the permissions for the returned credentials
  """
  return (
  "https://accounts.google.com/o/oauth2/auth?"
  + f"client_id={config.google_cloud_client_id}&"
  + f"redirect_uri={redirect_url}&"
  + f"scope={config.google_oauth_scopes}&"
  + "response_type=code&"
  + "prompt=consent&" # This causes to always have a refresh token
  + "access_type=offline" # Alongside with this
  )


def get_crendentials_for_oauth(
  oauth_code: str, redirect_url: str, config: Config
) -> Credentials:
  """
  Get the credentials for a user that has been authenticated with OAuth2
  """
  request_url = "https://oauth2.googleapis.com/token"
  request_data = {
    "code": oauth_code,
    "client_id": config.google_cloud_client_id,
    "client_secret": config.google_cloud_client_secret,
    "redirect_uri": redirect_url,
    "grant_type": "authorization_code",
  }
  response = requests.post(request_url, request_data, timeout=20)
  data = response.json()

  return Credentials(
    scope=data["scope"],
    expires_in=data["expires_in"],
    refresh_token=data["refresh_token"],
    access_token=data["access_token"],
  )

def get_profile(credentials: Credentials) -> AuthProfile:
  """
  Get the profile of the user that is logged in
  """
  request_url = "https://www.googleapis.com/oauth2/v1/userinfo"
  request_headers = {"Authorization": f"Bearer {credentials.access_token}"}
  response = requests.get(request_url, headers=request_headers, timeout=20)
  data = response.json()
  return AuthProfile(name=data["name"], picture=data["picture"])
