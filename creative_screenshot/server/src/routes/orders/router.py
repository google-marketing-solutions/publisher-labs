"""
 Routing module for the Google Ad Manager Order feature

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
from typing import List


from infrastructure.ad_manager.dependencies import (
  get_ad_manager_client,
  AdManagerClient,
)
from routes.orders.schemas import Order, LineItem, Creative
from routes.auth.dependencies import get_auth_credentials
import routes.orders.service as service

order_router = APIRouter(
  dependencies=[Depends(get_auth_credentials),
          Depends(get_ad_manager_client)]
)

@order_router.get("/orders/", response_model=List[Order])
def get_orders(
  advertiser_id: int | None = None,
  client: AdManagerClient = Depends(get_ad_manager_client)
) -> List[Order]:
  """Get recent orders, if supplied, filtered by an advertiser"""
  if advertiser_id:
    return service.get_orders_for_advertiser(advertiser_id, client)
  else:
    return service.get_recent_orders(client)


@order_router.get(
  "/orders/{order_id}/line_items/", response_model=List[LineItem]
)
def get_order_line_items(
  order_id: int, client: AdManagerClient = Depends(get_ad_manager_client)
) -> List[LineItem]:
  """Get an order's line items"""
  return service.get_line_items_for_order(order_id, client)


@order_router.get(
  "/orders/line_items/{line_item_id}/creatives/",
  response_model=List[Creative],
)
def get_order_line_item_creatives(
  line_item_id: int, client: AdManagerClient = Depends(get_ad_manager_client)
) -> List[Creative]:
  """Get the creatives for an order's line items"""
  return service.get_creatives_for_line_item(line_item_id, client)
