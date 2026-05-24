# Deployment Guide

This project is designed for:

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## 1. Create A Neon Database

1. Go to `https://neon.tech`.
2. Create a new PostgreSQL project.
3. Copy the connection string.
4. Use it as the backend `DATABASE_URL`.

The URL should look like:

```text
postgresql+psycopg://user:password@host/database?sslmode=require
```

## 2. Deploy Backend On Render

1. Push this project to GitHub.
2. Go to `https://render.com`.
3. Create a new web service.
4. Connect the GitHub repository.
5. Use the included `render.yaml`, or configure manually:

```text
Root Directory: backend
Environment: Docker
Health Check Path: /health
```

Set environment variables:

```text
PROJECT_NAME=FinTrack API
DATABASE_URL=<your Neon connection string>
SECRET_KEY=<strong random secret>
BACKEND_CORS_ORIGINS=<your Vercel frontend URL>
```

After deployment, confirm:

```text
https://your-render-service.onrender.com/health
```

## 3. Deploy Frontend On Vercel

1. Go to `https://vercel.com`.
2. Import the GitHub repository.
3. Set the root directory to:

```text
frontend
```

Set environment variable:

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

Build settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

## 4. Update CORS

After Vercel deployment, copy the frontend URL and add it to Render:

```text
BACKEND_CORS_ORIGINS=https://your-vercel-app.vercel.app
```

Redeploy the backend after changing this value.

## 5. Production Smoke Test

Verify these in order:

1. Open frontend URL.
2. Register a new user.
3. Add an expense.
4. Create a budget.
5. Add a portfolio position.
6. Open dashboard and confirm charts update.
7. Open backend `/docs` and confirm APIs are visible.
