# ExponentialScape

A minimal monorepo with a Next.js frontend and an Express backend. This repository demonstrates a simple setup using pnpm workspaces and now includes basic analytics and collaboration features. The site now provides a simple navigation bar, an About page and a new Metrics section. A dark mode toggle brings the UI in line with modern 2025 design trends.

## Features

- **Analytics:** The backend tracks how many times the homepage has been viewed.
- **Collaboration:** A simple message board lets visitors leave short messages.
- **Dark Mode:** Toggle between light and dark themes to match your preference.
- **Contact Form:** Visitors can send inquiries via the new contact page.
- **Metrics Page:** View overall page views and trending messages.

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
