# SmartList

[![CI](https://github.com/JohnSandalis/Smartlist/actions/workflows/deploy.yml/badge.svg)](https://github.com/JohnSandalis/Smartlist/actions/workflows/deploy.yml)
[![License](https://img.shields.io/github/license/JohnSandalis/Smartlist)](LICENSE)

## About SmartList

SmartList is a web application designed for Greek consumers to simplify grocery shopping and maximize savings. It enables users to compare product prices across multiple supermarkets and create shopping lists. Leveraging data from E-katanalotis, SmartList optimizes product combinations from different stores to minimize the total cost of the shopping cart.

## Tech Stack

- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** Node.js (Express, TypeScript)
- **Database:** Supabase (PostgreSQL)
- **Internationalization:** next-intl
- **Schema Validation:** Zod
- **API Documentation:** Swagger
- **Containerization:** Docker
- **Deployment:** DigitalOcean Droplet

## How to Run (Development)

### Setup Environment Variables

Create a `.env` file in the `apps/frontend/` directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXT_PUBLIC_ENV="development"
```

Create a `.env` file in the `apps/backend/` directory with the following variables:

```env
SUPABASE_URL="your_supabase_url"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
NODE_ENV="development"
PORT="8080"
```

### Run in Development Mode

Run frontend & backend simultaneously using:

```bash
npm install
npm run dev
```

### Test Docker Compose Build

Make sure you have Docker installed & running in the background of your local machine. Build and start the application containers with:

```bash
docker compose up --build -d
```

The backend API will be available at http://localhost:8080 and the frontend at http://localhost:3000
