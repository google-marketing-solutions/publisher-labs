# Server (Ad Manager Creative Screenshot Tool)

**Please note: this is not an officially supported Google product.**

This server is the backend for the client side application of this project.
Deploying and using this backend can be done seperatly from the frontend. Out of the box, the backend handles autentification, Ad Manager data fetching, creating and serving the creative on-page screenshots.

## Technologies

- FastAPI
    - Python web-api framework. Choosen for it's depency injections and popularity
- GoogleOAuth
    - Most of the auth code is run on the server-side, needed for authentification for Google product like the Ad Manager API
- Google Ad Manager API
    - Used for fetching data from your ad manager account
- Selenium
    - A chrome web driver is used for opening a creative preview's website and take screenshots

## Prerequisites

Before running the application, the following steps and tools are needed on the device where this server will be ran

- Python 3.10+
- PIP
- Chrome Browser
    - To run Selenium in
- A Google Cloud OAuth2 client (see below)
- Corretly setup `.env` file (see below)

###  Google Cloud OAuth2 client

This project uses Google OAuth 2.0 and sends credentials to the Google Ad Manager API, using the web client auth flow.

Therefore, a Google Cloud project and an OAuth 2.0 web client is required.

- [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

After creating a Google OAuth 2.0 Web Client in the Google Cloud console, fill in the environment variables correctly, as described in the `.env.sample` file.

###  Environment variables

- Copy the `.env.sample` file and rename it to `.env`
- Fill in each of the constants in that `.env` file accordingly
- On requests, the server will use the secrets stored in the server's cached `.env` file


## Installation

1. Make sure to follow the prerequisites
2. Install dependencies
```bash
pip install -r requirement.txt
```
3. Run the server with python
```bash
python server.py
```

## Usage

- The server should be live at [http://localhost:8080](http://localhost:8080).
- A 200 health route is live under [/ping/](http://localhost:8080/ping/) and returns `200` and `"pong"`
- The API's documentation and playground are live under [/docs/](http://localhost:8080/docs/)


## Deployment

Our recommendation is bundling the server in a Docker image, and running it on a Google Cloud Run. Make sure that your infrastructure supports running a Selenium Chrome webdriver in headless mode.
