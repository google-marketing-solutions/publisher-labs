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

from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse

from config import Config, get_config
import routes.auth.service as service
from routes.auth.dependencies import (
  get_auth_credentials,
  get_callback_url,
  Credentials,
)
from routes.auth.schemas import AuthProfile

auth_router = APIRouter()


@auth_router.get("/auth/callback/", response_class=RedirectResponse)
def get_auth_callback(
  code: str,
  request: Request,
  redirect_url: str = Depends(get_callback_url),
  config: Config = Depends(get_config),
):
  """Route that the Google OAuth link will redirect to"""
  credentials = service.get_crendentials_for_oauth(code, redirect_url, config)
  request.session["credentials"] = credentials.model_dump()
  return config.web_client_redirect_url or "/"


@auth_router.get(
  "/auth/login/",
  dependencies=[Depends(get_callback_url), Depends(get_config)],
)
def get_auth_login(
  redirect_url: str = Depends(get_callback_url),
  config: Config = Depends(get_config),
) -> str:
  """Get the Google OAuth login url"""
  return service.get_login_url(redirect_url, config)


@auth_router.get(
  "/auth/login/redirect/",
  response_class=RedirectResponse,
  dependencies=[Depends(get_callback_url), Depends(get_config)],
)
def get_auth_login_redirect(
  redirect_url: str = Depends(get_callback_url),
  config: Config = Depends(get_config),
) -> str:
  """Get and redirect to the Google OAuth login url"""
  return service.get_login_url(redirect_url, config)


@auth_router.get(
  "/auth/clear/",
  response_class=RedirectResponse,
  dependencies=[Depends(get_auth_credentials)],
)
def get_auth_clear(request: Request):
  """Clear the user's request credentials"""
  request.session.pop("credentials")
  return "/"


@auth_router.get(
  "/auth/profile/",
  response_model=AuthProfile,
  dependencies=[Depends(get_auth_credentials)],
)
def get_auth_profile(
  credentials: Credentials = Depends(get_auth_credentials),
) -> AuthProfile:
  """Get a Google profile for a given user by request credentials"""
  return service.get_profile(credentials)
