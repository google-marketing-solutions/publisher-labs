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

class Order(BaseModel):
  id: int
  name: str


class LineItem(BaseModel):
  id: int
  name: str

class Creative(BaseModel):
  id: int
  status: str
  line_item_id: int
  name: str
  width: int
  height: int
  advertiser_id: int
  url: str | None = None
  preview_url: str | None = None
