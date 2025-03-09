# TrueRank API

This is the backend API for the TrueRank application, built with Fastify and TypeScript.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

   ```bash
   npm install
   ```

## Configuration

The API uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000  # Optional: Default is 3000
```

## Running the API

### Development Mode

To run the API in development mode with hot reload:

```bash
npm start
```

This uses nodemon to watch for changes and automatically restart the server.

### Production Mode

To run the API in production mode:

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run serve
   ```

## Verifying Installation

Once the server is running, you can test it by making a GET request to the healthcheck endpoint:

```bash
curl http://localhost:3000/
```

You should receive a response:
```json
{"status":"ok"}
```

## Available Scripts

- `npm start`: Runs the server in development mode with hot reload
- `npm run build`: Compiles TypeScript code to JavaScript
- `npm run serve`: Runs the compiled JavaScript code

## Project Structure

```
api/
├── src/
│   ├── config/     # Configuration files
│   ├── routes/     # API routes
│   └── index.ts    # Application entry point
├── package.json
├── tsconfig.json   # TypeScript configuration
└── nodemon.json    # Nodemon configuration
```

## Features

- Built with Fastify for high performance
- TypeScript support
- Hot reloading in development
- Environment configuration via @fastify/env
- Built-in logging
- Health check endpoint
