# FinTrack Dashboard

FinTrack is a full-stack personal finance and portfolio dashboard built for expense tracking, budget monitoring, CSV transaction imports, investment tracking, and analytics.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Recharts
- Backend: FastAPI, SQLAlchemy, Pydantic, JWT authentication
- Database: PostgreSQL in production, SQLite-friendly local fallback
- Data: CSV transaction parsing and rule-based transaction categorization
- Deployment target: Vercel, Render or Railway, Neon PostgreSQL

## Features

- User registration and login with JWT authentication
- Protected dashboard routes
- Expense CRUD API with category and date filters
- Budget creation and usage tracking
- Portfolio position tracking with profit/loss calculations
- CSV import endpoint for bank statement transactions
- Analytics summary endpoint for cards and charts
- Responsive dashboard UI with chart visualizations
- Recruiter demo mode for frontend walkthroughs
- Deployment scaffolding for Vercel and Render

## Project Structure

```text
FIN_TRACK/
  backend/
    app/
      auth/
      core/
      database/
      models/
      routes/
      schemas/
      services/
  frontend/
    src/
      components/
      data/
      hooks/
      pages/
      services/
  docs/
  README.md
```

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python -m uvicorn app.main:app --reload
```

The API will run at `http://localhost:8000`.

API docs will be available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Recruiter Demo Mode

The login page includes an `Open recruiter demo` button. It creates a local demo session and opens the dashboard with sample finance data, so the frontend can be presented even before the backend is deployed.

For a complete walkthrough script, see [docs/RECRUITER_DEMO.md](docs/RECRUITER_DEMO.md).

## Verification

Frontend checks:

```bash
cd frontend
npm run lint
npm run build
```

Backend checks:

```bash
cd backend
python -m compileall app
python -m pytest
```

## Deployment

Deployment instructions are available in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

GitHub publishing notes are available in [docs/GITHUB_CHECKLIST.md](docs/GITHUB_CHECKLIST.md).

## Environment Variables

Backend:

```text
PROJECT_NAME=FinTrack API
DATABASE_URL=sqlite:///./fintrack_dev.db
SECRET_KEY=change-this-secret-before-deploying
ACCESS_TOKEN_EXPIRE_MINUTES=1440
BACKEND_CORS_ORIGINS=http://localhost:5173
```

Frontend:

```text
VITE_API_BASE_URL=http://localhost:8000
```

## CSV Import Format

CSV uploads should include:

```csv
date,description,amount
2026-05-01,Zomato dinner,820
2026-05-02,Internet bill,1299
```

## Resume Bullet

Built a full-stack fintech dashboard using React, FastAPI, PostgreSQL, and JWT authentication, featuring expense CRUD, CSV transaction parsing, budget analytics, portfolio profit/loss tracking, and interactive Recharts visualizations.

## Roadmap

- Add Alembic migrations
- Add stock market API integration
- Add recurring subscription detection
- Add PDF monthly reports
- Add automated backend and frontend tests
- Deploy frontend, backend, and PostgreSQL database
