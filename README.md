
# Creative Screenshot Tool

## Ad Manager Automated Creative On-site Screenshots

*Please note: this is not an officially supported Google product.*

This repository holds a proof of concept to automate the process of taking on-site screenshots of ad creatives for Ad Manager publishers.

## Authors

- ghys@google.com (LouGhys on Github)

## Contributing

We're always looking to improve this, contributions are always welcome!
Simularly, if you used this, let us know and give us feedback!

See `contributing.md` for ways to get started.


## 0. Prerequisites

Before running the application, the following steps and tools are needed on the device where both server will be ran:

- [Node](https://nodejs.org/en/download/package-manager)
    - `node --version`: 16.19.0
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
    - `npm install -g yarn`
    - `yarn --version`: 1.22.19
- [Python 3](https://www.python.org/downloads/)
    - `python --version`: 3.11.4
- [pip](https://pip.pypa.io/en/stable/installation/)
    - `pip --version`: 24.0
- [Google Chrome](https://www.google.com/chrome/browser-tools/)
    - the selenium headless browser runs on chrome
- A Google Cloud OAuth2 client (see below)
- Configured `/server/src/.env` (see below)

####  Google Cloud OAuth2 client

This project uses Google OAuth 2.0 and sends credentials to the Google Ad Manager API, using the web client auth flow.

Therefore, a Google Cloud project and an OAuth 2.0 web client is required.

- [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

After creating a Google OAuth 2.0 Web Client in the Google Cloud console, fill in the environment variables correctly, as described in the `.env.example` file.

####  Environment variables

- Copy the `.env.example` file and rename it to `.env`
- Fill in each of the constants in that `.env` file accordingly
- On requests, the server will use the secrets stored in the server's cached `.env` file

## 1. Backend

The `/server/` folder is the backend for the client side application of this project.
Deploying and using this backend can be done seperatly from the frontend. Out of the box, the backend handles autentification, Ad Manager data fetching, creating and serving the creative on-page screenshots.
Note that the backend can be used standalone without the frontend.

### Installation

1. Make sure to follow the prerequisites
2. Install dependencies
```bash
pip install -r requirements.txt
```
3. Run the server with python
```bash
python server.py
```

### Usage

- The servers endpoint: [http://localhost:8080](http://localhost:8080).
- Check 200 status is returned [/ping/](http://localhost:8080/ping/) and returns `200` and `"pong"`
- API's documentation: [/docs/](http://localhost:8080/docs/)


## 2. Frontend

This react application is the client side application of this project.

### Installation

1. Make sure to follow the prerequisites
2. Install dependencies
```bash
yarn
```
3. Generate API client (make sure your backend server is running at  [http://localhost:8080](http://localhost:8080))
    - This will create the API client typescript files under `/generated/`
```bash
yarn generate-api-client
````
4. Run the frontend server in dev mode
```bash
yarn start
```

### Usage

- The server should be live at [http://localhost:5000](http://localhost:5000).
- For the Google login, please use the account tied to your Google Ad Manager network

## 3. Deploying this as a product

From step 1 & 2 of the setup, you should now have 2 servers running:
- The frontend on port 5000 (ex http://localhost:5000)
- The backend on port 8080 (ex http://localhost:8080)

Our recommendation is to create a Docker image containing both servers and all their dependencies (Selenium, node, etc…). Once you have a Docker image, a can use it in Google Cloud Run, as lightweight infrastructure.


## Technologies used

- FastAPI
    - Python web-api framework. Choosen for it's depency injections and popularity
- GoogleOAuth
    - Most of the auth code is run on the server-side, needed for authentification for Google product like the Ad Manager API
- Google Ad Manager API
    - Used for fetching data from your ad manager account
- Selenium
    - A chrome web driver is used for opening a creative preview's website and take screenshots
- React
- Chakra UI
- ES Build (For bundling and packaging)
- Auto-generated API client from OpenAPI spec
