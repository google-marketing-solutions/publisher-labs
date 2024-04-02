"""
 Service for handling the integration between routing and lower level logic

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

from pathlib import Path

import infrastructure.ad_manager.service
from infrastructure.ad_manager.dependencies import AdManagerClient
import infrastructure.selenium.service
from routes.screenshot.schemas import ScreenshotCreateInput, Screenshot


SCREENSHOT_DIRECTORY = "./__generated/screenshots/"

def create_screenshot(
  data: ScreenshotCreateInput, client: AdManagerClient
) -> Screenshot:
  """
  Get a creative previuew url from the Google Ad Manager API
  Using that url, open a selenium browser and take a screenshot
  """

  width = nullable_number_to_none(data.width)
  height = nullable_number_to_none(data.height)

  # Format is a made up one (ex: xxx-yyy-1920x1080-True)
  screenshot_id = (
    f"{data.line_item_id}-{data.creative_id}-"
    + f"{width or 'full'}x{height or 'full'}-"
    + f"{data.identify_creatives}"
  )

  in_website_url = infrastructure.ad_manager.service.get_creative_preview_url(
    line_item_id=data.line_item_id,
    creative_id=data.creative_id,
    website_url=data.website_url,
    client=client,
  )


  # Get the screenshot's save path
  # and create the directory if it doesn't exist
  screenshot_save_path = get_screenshot_path(screenshot_id)
  Path(SCREENSHOT_DIRECTORY).mkdir(parents=True, exist_ok=True)

  infrastructure.selenium.service.open_browser_and_save_screenshot(
    url=in_website_url,
    screenshot_save_path=screenshot_save_path,
    identify_creatives=data.identify_creatives,
    width=width,
    height=height,
  )
  return Screenshot(
    screenshot_id=screenshot_id, in_website_url=in_website_url
  )

def get_screenshot_path(screenshot_id: str) -> str:
  return SCREENSHOT_DIRECTORY + screenshot_id + ".png"

def nullable_number_to_none(value: int | None) -> int | None:
  if value is None:
    return None
  if value <= 0:
    return None
  return value
