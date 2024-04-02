"""
 Infrastructure level service handling opening a browser
 and taking a screenshot

 Done with the use of the selenium chrome web driver

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

from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from seleniumwire import webdriver

import infrastructure.selenium.scripts as scripts

# Selenium will wait for the following network request to be matched
# After matching to the GPT library fetch request (default or limited ads)
# It will then wait for the AFTER_SLEEP time to take a screenshot
AD_REQUEST_WAIT_URL = "/tag/js/gpt.js"
AD_REQUEST_LOAD_TIMEOUT = 10
AD_REQUEST_AFTER_SLEEP = 5
# Use a common viewport for width fallback
FALLBACK_WIDTH = 1920
# Use a large viewport for height fallback
FALLBACK_HEIGHT = 10000
# This setting can be used in development to visually see the process
IS_HEADLESS = True


def open_browser_and_save_screenshot(
  url,
  screenshot_save_path,
  identify_creatives=False,
  width=None,
  height=None,
):
  """
  Opens a selenium web browser on the device,
  at the given url, takes a screenshot with the given settings
  and saves it locally.
  """
  options = Options()

  if IS_HEADLESS:
    options.add_argument("--headless")

  options.add_argument("--start-maximized")
  driver = webdriver.Chrome(chrome_options=options)

  # Set device size
  driver_width = width or FALLBACK_WIDTH
  driver_height = height or FALLBACK_HEIGHT
  driver.set_window_size(driver_width, driver_height)

  driver.get(url)

  driver.wait_for_request(AD_REQUEST_WAIT_URL, AD_REQUEST_LOAD_TIMEOUT)
  sleep(AD_REQUEST_AFTER_SLEEP)

  is_fullsize_screenshot = width is None and height is None
  if is_fullsize_screenshot:
    driver_height = driver.execute_script(scripts.GET_BODY_HEIGHT)
    sleep(1)  # Safe sleep to wait for the execution of selenium scripts
    driver.set_window_size(driver_width, driver_height)
  else:
    driver.execute_script(scripts.SCROLL_AD_SLOT_INTO_VIEW)
  sleep(1)  # Safe sleep to wait for the execution of selenium scripts

  # Identify creatives with border
  if identify_creatives:
    driver.execute_script(scripts.IDENTIFY_CREATIVE_WITH_RED_BORDER)
    sleep(1)  # Safe sleep to wait for the execution of selenium scripts

  driver.find_element(By.TAG_NAME, "body").screenshot(screenshot_save_path)
  sleep(1)  # Safe sleep to wait for the execution of selenium scripts
  driver.close()
