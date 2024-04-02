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

from pydantic import BaseModel


class ScreenshotCreateInput(BaseModel):
  line_item_id: int
  creative_id: int
  website_url: str
  identify_creatives: bool | None = False
  width: int | None = None
  height: int | None = None


class Screenshot(BaseModel):
  screenshot_id: str
  in_website_url: str
