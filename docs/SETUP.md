# FinTrack Setup Guide

## Required Tools

Install these before running the project:

- Node.js LTS
- Python 3.11 or newer
- Git
- PostgreSQL, or use the local SQLite fallback for early development

## Development Order

1. Start the backend.
2. Register a user from the frontend.
3. Add expenses and budgets.
4. Import a CSV file.
5. Add portfolio positions.
6. Verify dashboard charts update from API data.

## Backend Commands

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python -m uvicorn app.main:app --reload
```

## Frontend Commands

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Production Deployment Notes

- Use Neon for PostgreSQL.
- Set `DATABASE_URL` in the backend host.
- Set `SECRET_KEY` to a strong random value.
- Set `BACKEND_CORS_ORIGINS` to the deployed Vercel frontend URL.
- Set `VITE_API_BASE_URL` to the deployed backend URL in Vercel.
