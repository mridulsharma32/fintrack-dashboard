# Architecture

## Frontend

React is organized around pages, shared UI components, hooks, and service modules.

```text
src/
  components/
  hooks/
  pages/
  services/
```

Axios attaches the JWT token to protected API requests. React Router controls public auth pages and protected dashboard pages.

## Backend

FastAPI is organized around route modules, SQLAlchemy models, Pydantic schemas, and reusable services.

```text
app/
  auth/
  core/
  database/
  models/
  routes/
  schemas/
  services/
```

Each protected route uses `get_current_user` to scope data to the logged-in user.

## Data Flow

1. User logs in or registers.
2. Backend returns a JWT access token.
3. Frontend stores the token in local storage.
4. Axios sends the token as a Bearer token.
5. Backend validates the token and loads the current user.
6. Expense, budget, portfolio, and analytics queries are scoped to that user.
