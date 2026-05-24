from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy import extract, func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.budget import Budget
from app.models.expense import Expense
from app.models.portfolio import PortfolioPosition
from app.models.user import User

router = APIRouter()


@router.get("/summary")
def get_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    today = date.today()
    monthly_total = db.scalar(
        select(func.coalesce(func.sum(Expense.amount), 0)).where(
            Expense.user_id == current_user.id,
            extract("month", Expense.date) == today.month,
            extract("year", Expense.date) == today.year,
        )
    )
    budget_total = db.scalar(select(func.coalesce(func.sum(Budget.limit_amount), 0)).where(Budget.user_id == current_user.id))
    portfolio_value = db.scalar(
        select(func.coalesce(func.sum(PortfolioPosition.quantity * PortfolioPosition.current_price), 0)).where(
            PortfolioPosition.user_id == current_user.id
        )
    )
    category_rows = db.execute(
        select(Expense.category, func.coalesce(func.sum(Expense.amount), 0))
        .where(Expense.user_id == current_user.id)
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
    ).all()
    monthly_rows = db.execute(
        select(extract("month", Expense.date), func.coalesce(func.sum(Expense.amount), 0))
        .where(Expense.user_id == current_user.id, extract("year", Expense.date) == today.year)
        .group_by(extract("month", Expense.date))
        .order_by(extract("month", Expense.date))
    ).all()

    return {
        "monthly_expenses": monthly_total,
        "budget_remaining": budget_total - monthly_total,
        "portfolio_value": portfolio_value,
        "savings_rate": 28,
        "category_breakdown": [{"category": row[0], "amount": row[1]} for row in category_rows],
        "monthly_spending": [{"month": int(row[0]), "amount": row[1]} for row in monthly_rows],
        "insights": [
            "Track budgets weekly to catch overspending before month end.",
            "CSV imports can reveal recurring subscriptions and hidden trends.",
        ],
    }
