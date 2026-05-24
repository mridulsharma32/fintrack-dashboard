# FinTrack Project Plan

## Goal

Build a resume-ready full-stack fintech dashboard that demonstrates authentication, relational database design, REST APIs, CSV data processing, analytics, and deployment.

## Milestone 1: Foundation

- Create React frontend with Vite and Tailwind CSS.
- Create FastAPI backend with modular route structure.
- Add environment examples and setup docs.
- Add protected routing and API service layer.

Status: scaffolded.

## Milestone 2: Authentication

- Register users.
- Log users in.
- Hash passwords with bcrypt.
- Issue JWT access tokens.
- Protect dashboard APIs by current user.

Status: scaffolded.

## Milestone 3: Finance Core

- Add, list, edit, and delete expenses.
- Filter expenses by category and date.
- Add category budgets.
- Calculate spent, remaining, and usage percentage.

Status: backend and frontend starter flows created.

## Milestone 4: Analytics Dashboard

- Show monthly expense cards.
- Show spending trend charts.
- Show category breakdown charts.
- Show savings and portfolio summary.

Status: dashboard UI and analytics endpoint created.

## Milestone 5: Standout Features

- Upload CSV bank statements.
- Auto-categorize transactions with keyword rules.
- Track portfolio positions.
- Calculate market value and profit/loss.

Status: starter versions created.

## Milestone 6: Production Polish

- Add Alembic migrations.
- Add backend tests.
- Add frontend loading and empty states.
- Add dark mode.
- Add screenshots and demo GIFs.
- Deploy backend, frontend, and database.

Status: deployment scaffolding added; backend runtime verification still needs Python installed locally.

## Interview Talking Points

- JWT authentication flow.
- Password hashing and why plaintext passwords are unsafe.
- SQLAlchemy relationships and user-scoped queries.
- CSV parsing and keyword-based categorization.
- REST API design.
- Frontend route protection.
- Chart data shaping.
- Deployment environment variables.
