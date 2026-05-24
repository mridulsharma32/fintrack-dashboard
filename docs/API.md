# API Overview

Base URL:

```text
http://localhost:8000
```

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Expenses

- `GET /api/expenses`
- `POST /api/expenses`
- `PATCH /api/expenses/{expense_id}`
- `DELETE /api/expenses/{expense_id}`

## Budgets

- `GET /api/budgets`
- `POST /api/budgets`

## Portfolio

- `GET /api/portfolio`
- `POST /api/portfolio`
- `DELETE /api/portfolio/{position_id}`

## Analytics

- `GET /api/analytics/summary`

## CSV Import

- `POST /api/imports/csv`

CSV columns:

```text
date,description,amount
```
