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

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse


import routes.screenshot.service as service
from routes.screenshot.schemas import ScreenshotCreateInput, Screenshot

from routes.auth.dependencies import get_auth_credentials
from infrastructure.ad_manager.dependencies import (
  AdManagerClient,
  get_ad_manager_client,
)

screenshot_router = APIRouter()


@screenshot_router.post(
  "/screenshot/",
  response_model=Screenshot,
  dependencies=[Depends(get_ad_manager_client)],
)
def create_screenshot(
  screenshot: ScreenshotCreateInput,
  client: AdManagerClient = Depends(get_ad_manager_client),
) -> Screenshot:
  return service.create_screenshot(screenshot, client)


@screenshot_router.get(
  "/screenshot/{screenshot_id}", dependencies=[Depends(get_auth_credentials)]
)
def get_screenshot(screenshot_id: str):
  return FileResponse(
    service.get_screenshot_path(screenshot_id), media_type="image/png"
  )
