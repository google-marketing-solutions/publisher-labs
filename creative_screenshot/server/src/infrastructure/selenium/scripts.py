"""
  Javscript snippets used by selenium

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

GET_BODY_HEIGHT = "return document.body.parentNode.scrollHeight"


SCROLL_AD_SLOT_INTO_VIEW = "document.querySelector("\
+ "\"[data-load-complete='true'\""\
+ ").scrollIntoView(true)"

IDENTIFY_CREATIVE_WITH_RED_BORDER = \
      """
      Array.from(
      document.querySelectorAll("[data-load-complete=\'true\'"))
      .forEach(el => el.style.border = "5px solid red")
      """
