# Recruiter Demo Guide

Use this flow when showing FinTrack in an interview, resume walkthrough, or LinkedIn/GitHub portfolio review.

## Local Demo

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Click `Open recruiter demo` on the login page.

The demo opens the dashboard using local sample data, so you can show the UI even if the backend is not running.

## Full-Stack Demo

Start the backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python -m uvicorn app.main:app --reload
```

Start the frontend:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open:

```text
http://localhost:5173
```

Create an account, then show:

1. Dashboard cards and charts.
2. Expense creation.
3. CSV upload with `docs/sample-transactions.csv`.
4. Budget tracking.
5. Portfolio profit/loss.
6. API docs at `http://localhost:8000/docs`.

## 3-Minute Walkthrough Script

FinTrack is a full-stack personal finance dashboard built with React, FastAPI, SQLAlchemy, and JWT authentication.

The dashboard summarizes monthly expenses, remaining budget, portfolio value, and savings rate. Expenses can be added manually or imported from CSV bank statements. The backend parses transactions and categorizes them using keyword rules.

Budgets are tracked by category, and the portfolio module calculates market value and profit/loss from stock positions. The API is protected with JWT tokens, and every finance record is scoped to the logged-in user.

The project is designed for production deployment with Vercel for the frontend, Render or Railway for the backend, and Neon PostgreSQL for the database.

## What To Highlight

- Secure authentication with password hashing and JWT tokens.
- Relational data modeling with users, expenses, budgets, portfolio positions, and alerts.
- CSV parsing pipeline with keyword-based categorization.
- Analytics endpoint that powers cards and Recharts visualizations.
- Clean frontend architecture with protected routes and API service layer.
- Deployment-ready environment variable setup.
