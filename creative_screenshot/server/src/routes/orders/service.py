"""
 Order service. Used as middle layer between the router and the lower level
 API-calling layer

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

from typing import List

import infrastructure.ad_manager.service as ad_manager_service
from infrastructure.ad_manager.service import AdManagerClient
from routes.orders.schemas import Order, LineItem, Creative

def _format_order_data(data: list) -> List[Order]:
  orders: List[Order] = list()
  for order in data:
    formatted = {"id": order["id"], "name": order["name"]}
    orders += [Order(**formatted)]
  return orders

def get_recent_orders(client: AdManagerClient) -> List[Order]:
  data = list(ad_manager_service.get_recent_orders(client))
  data.sort(key=lambda x: x["name"])
  return _format_order_data(data)

def get_orders_for_advertiser(
  advertiser_id: int, client: AdManagerClient
) -> List[Order]:
  data = list(
    ad_manager_service.get_orders_for_advertiser(advertiser_id, client)
  )
  data.sort(key=lambda x: x["name"])
  return _format_order_data(data)

def get_line_items_for_order(order_id: int, client) -> List[LineItem]:
  data = list(
    ad_manager_service.get_line_items_for_order_id(order_id, client)
  )
  data.sort(key=lambda x: x["name"])
  line_items: List[LineItem] = list()

  for line_item in data:
    formatted: dict[str | int, str] = {
      "id": line_item["id"],
      "name": line_item["name"],
    }
    line_items += [LineItem(**formatted)]
  return line_items


def get_creatives_for_line_item(
  line_item_id: str, client: AdManagerClient
) -> List[Creative]:
  data = list(ad_manager_service.get_creative_association_for_line_item_id(
    line_item_id, client))
  data.sort(key=lambda x: x["creativeId"])
  creatives: List[Creative] = list()
  for creative_association in data:
    creative = ad_manager_service.get_creative_for_creative_id(
      creative_association["creativeId"], client
    )
    formatted: dict[str, any] = {
      "id": creative_association["creativeId"],
      "url": creative_association["destinationUrl"],
      "status": creative_association["status"],
      "line_item_id": creative_association["lineItemId"],
      "preview_url": creative["previewUrl"],
      "name": creative["name"],
      "width": creative["size"]["width"],
      "height": creative["size"]["height"],
      "advertiser_id": creative["advertiserId"],
    }
    creatives += [Creative(**formatted)]
  return creatives
