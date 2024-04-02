"""
 Infrastructure level service to request data from the Google Ad Manager API

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

from googleads.ad_manager import AdManagerClient, StatementBuilder
from googleads.errors import GoogleAdsServerFault


def get_creative_association_for_line_item_id(
  line_item_id: int, client: AdManagerClient
):
  """Fetch all creative associations for line item id from Google Ad Manager"""
  line_item_creative_association_service = client.GetService(
    "LineItemCreativeAssociationService"
  )
  statement = (
    StatementBuilder()
    .Where("lineItemId = :lineItemId")
    .WithBindVariable("lineItemId", line_item_id)
    .ToStatement()
  )
  creative_association = line_item_creative_association_service\
    .getLineItemCreativeAssociationsByStatement(
    statement
  )
  return creative_association["results"]


def get_creative_for_creative_id(creative_id: int, client: AdManagerClient):
  """Fetch a GAM creative for a given creative id"""

  creative_service = client.GetService("CreativeService")
  statement = (
    StatementBuilder()
    .Where("id = :creativeId")
    .WithBindVariable("creativeId", creative_id)
    .ToStatement()
  )
  data = creative_service.getCreativesByStatement(statement)
  return data["results"][0]


def get_creative_preview_url(
  line_item_id: int,
  creative_id: int,
  website_url: str,
  client: AdManagerClient,
) -> str:
  """
  Get a GAM on-site preview url for a publisher's website.
  This url is returned from ad manager, giving us a url with some params,
  indicating the website and GPT library on it, to render creatives in the
  website's ad slots where possible (targetting and sizes matching).
  """
  line_item_creative_association_service = client.GetService(
    "LineItemCreativeAssociationService"
  )
  try:
    return line_item_creative_association_service.getPreviewUrl(
      line_item_id, creative_id, website_url
    )
  except GoogleAdsServerFault:
    data = line_item_creative_association_service\
      .getPreviewUrlsForNativeStyles(
        line_item_id, creative_id, website_url)
    return data[0]["previewUrl"]


def get_line_items_for_order_id(order_id: int, client: AdManagerClient):
  """Fetches all GAM line items for an order id"""
  line_item_service = client.GetService("LineItemService")
  statement = (
    StatementBuilder()
    .Where("OrderId = :orderId")
    .WithBindVariable("orderId", order_id)
    .ToStatement()
  )
  data = line_item_service.getLineItemsByStatement(statement)
  return data["results"]


def get_recent_orders(client: AdManagerClient):
  """Fetches recent GAM orders from the network"""
  order_service = client.GetService("OrderService")
  statement = (
    StatementBuilder()
    .Limit(100)
    .OrderBy("lastModifiedDateTime", ascending=False)
    .ToStatement()
  )
  data = order_service.getOrdersByStatement(statement)
  return data["results"]


def get_orders_for_advertiser(advertiser_id: int, client: AdManagerClient):
  """Fetches GAM orders from the network filtered by the order's advertiser"""
  order_service = client.GetService("OrderService")
  statement = (
    StatementBuilder()
    .Where("advertiserId =: advertiserId")
    .Limit(100)
    .OrderBy("lastModifiedDateTime", ascending=False)
    .WithBindVariable("advertiserId", advertiser_id)
    .ToStatement()
  )
  data = order_service.getOrdersByStatement(statement)
  return data["results"]
