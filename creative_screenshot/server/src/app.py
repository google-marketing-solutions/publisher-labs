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

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from config import WEB_CLIENT_REDIRECT_URL
from routes.common import common_router
from routes.auth.router import auth_router
from routes.orders.router import order_router
from routes.screenshot.router import screenshot_router

CORS_ALLOWED_ORIGINS = [
  WEB_CLIENT_REDIRECT_URL
]


def create_app():
  app = FastAPI()
  app.add_middleware(SessionMiddleware, secret_key=os.urandom(12))
  app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  )

  app.include_router(common_router)
  app.include_router(auth_router)
  app.include_router(order_router)
  app.include_router(screenshot_router)

  return app
