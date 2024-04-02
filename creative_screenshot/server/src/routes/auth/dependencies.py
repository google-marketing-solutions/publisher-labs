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

from fastapi import Request, HTTPException
from routes.auth.schemas import Credentials

def get_auth_credentials(request: Request) -> Credentials:
  """
  Gets the credentials from the session of a request

  Raises Exception: HTTPException when
  the credentials are not present or not valid
  """
  data = request.session.get("credentials")
  if data is None:
    raise HTTPException(
      status_code=401,
      detail="No crendetials found in request")
  credentials = Credentials(**data)
  if credentials is None or credentials.refresh_token is None:
    raise HTTPException(
      status_code=401,
      detail="Invalid crendetials")
  return credentials


def get_callback_url(request: Request) -> str:
  """Get the url for the auth callback route"""
  return str(request.url_for("get_auth_callback"))
