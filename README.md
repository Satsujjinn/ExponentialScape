# ExponentialScape

A minimal monorepo with a Next.js frontend and an Express backend. This repository demonstrates a simple setup using pnpm workspaces and now includes basic analytics and collaboration features. The site now provides a simple navigation bar and an About page.

## Features

- **Analytics:** The backend tracks how many times the homepage has been viewed.
- **Collaboration:** A simple message board lets visitors leave short messages.

## Development

Install dependencies and run the development servers:

```bash
pnpm install
pnpm dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000) and the backend API is available at [http://localhost:3001/api/hello](http://localhost:3001/api/hello).

### Environment

You can override the backend URL by setting the `API_URL` environment variable before running the frontend:

```bash
API_URL="http://localhost:3001" pnpm dev
```
