# FinTrack Project Workflow

# Project Goal
Build a production-level personal finance and portfolio dashboard using:
- React
- FastAPI
- PostgreSQL
- Tailwind CSS
- Recharts
- JWT Authentication

---

# PHASE 0 — PLANNING

## Final Features
### Core Features
- User Authentication
- Expense Tracking
- Budget Management
- Portfolio Tracking
- CSV Upload
- Analytics Dashboard
- Charts & Visualizations
- Alerts & Notifications

### Advanced Features
- AI Spending Insights
- Subscription Detection
- PDF Report Export
- Dark/Light Mode
- Responsive UI

---

# PHASE 1 — SETUP

## Step 1: Create GitHub Repository
Repository Name:
fintrack-dashboard

Folders:
frontend/
backend/

---

## Step 2: Setup Frontend

### Install Node.js
Download:
https://nodejs.org

### Create React App
```bash
npm create vite@latest frontend -- --template react
```

### Install Frontend Dependencies
```bash
cd frontend

npm install react-router-dom axios
npm install tailwindcss @tailwindcss/vite
npm install recharts
npm install react-icons
npm install framer-motion
```

---

## Step 3: Setup Backend

### Create Backend Folder
```bash
mkdir backend
cd backend
```

### Create Virtual Environment
```bash
python -m venv venv
```

### Activate Environment
Windows:
```bash
venv\Scripts\activate
```

Mac/Linux:
```bash
source venv/bin/activate
```

### Install Backend Packages
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install python-jose passlib bcrypt
pip install python-multipart pandas
pip install pydantic email-validator
```

---

# PHASE 2 — DATABASE DESIGN

## Tables Needed

### users
- id
- name
- email
- password_hash
- created_at

### expenses
- id
- user_id
- amount
- category
- description
- date

### budgets
- id
- user_id
- category
- limit_amount

### portfolio
- id
- user_id
- stock_symbol
- quantity
- buy_price

### alerts
- id
- user_id
- message
- status

---

# PHASE 3 — AUTHENTICATION SYSTEM

## Features
- Register
- Login
- JWT Tokens
- Protected Routes
- Password Hashing

## Backend Flow
1. User registers
2. Password gets hashed
3. User logs in
4. JWT token generated
5. Token sent to frontend
6. Protected routes validate token

---

# PHASE 4 — EXPENSE TRACKER

## Features
- Add expense
- Edit expense
- Delete expense
- Filter by date/category
- Monthly totals

## Categories
- Food
- Travel
- Shopping
- Bills
- Entertainment
- Education

---

# PHASE 5 — DASHBOARD UI

## Dashboard Cards
- Total Expenses
- Monthly Savings
- Portfolio Value
- Budget Remaining

## Charts
### Recharts
- Pie Chart
- Bar Chart
- Line Chart
- Area Chart

---

# PHASE 6 — CSV IMPORT SYSTEM

## Goal
Allow users to upload bank statements.

## Workflow
1. Upload CSV
2. Backend reads file using pandas
3. Parse transactions
4. Auto-categorize expenses
5. Store in PostgreSQL

---

# PHASE 7 — STOCK PORTFOLIO

## Features
- Add Stocks
- Watchlist
- Profit/Loss
- Allocation %
- Stock Search

## APIs
- Alpha Vantage
- Finnhub
- Yahoo Finance

---

# PHASE 8 — ANALYTICS ENGINE

## Insights
- Highest spending category
- Monthly comparison
- Savings rate
- Budget warnings

## Advanced
- Spending prediction
- Recurring subscription detection

---

# PHASE 9 — POLISHING

## Add
- Dark Mode
- Loading Skeletons
- Responsive Design
- Toast Notifications
- Error Handling

---

# PHASE 10 — DEPLOYMENT

## Frontend
Deploy on:
- Vercel

## Backend
Deploy on:
- Render
- Railway

## Database
Use:
- Neon PostgreSQL

---

# FINAL DELIVERABLES

## Resume Assets
- GitHub Repository
- Live Demo Link
- Screenshots
- Architecture Diagram

## Resume Bullet
Developed a full-stack finance dashboard enabling expense tracking, portfolio management, CSV transaction parsing, and analytics using React, FastAPI, PostgreSQL, JWT Authentication, and Recharts.
