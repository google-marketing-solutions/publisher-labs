# Client (Ad Manager Creative Screenshot Tool)

**Please note: this is not an officially supported Google product.**

This react application is the client side application of this project.

## Technologies

- React
- Chakra UI
- ES Build (For bundling and packaging)
- Auto-generated API client from OpenAPI spec

## Prerequisites

Before running the application, the following steps and tools are needed on the device where this server will be ran

- node installed
- yarn / npm installed (or any node package manager)
- the server running at `http://localhost:8080`

## Installation

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

## Usage

- The server should be live at [http://localhost:5000](http://localhost:5000).
- For the Google login, please use the account tied to your Google Ad Manager network


## Deployment

Our recommendation is bundling the server in a Docker image, and running it on a Google Cloud Run. You could potentially package the backend in the same environment as the
