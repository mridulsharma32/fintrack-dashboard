from decimal import Decimal

from fastapi import APIRouter, Depends, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.budget import Budget
from app.models.expense import Expense
from app.models.user import User
from app.schemas.budget import BudgetCreate, BudgetRead

router = APIRouter()


def serialize_budget(budget: Budget, spent: Decimal) -> BudgetRead:
    remaining = budget.limit_amount - spent
    usage_percent = float((spent / budget.limit_amount) * 100) if budget.limit_amount else 0
    return BudgetRead(
        id=budget.id,
        category=budget.category,
        limit_amount=budget.limit_amount,
        spent_amount=spent,
        remaining_amount=remaining,
        usage_percent=round(usage_percent, 2),
    )


@router.get("", response_model=list[BudgetRead])
def list_budgets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budgets = db.scalars(select(Budget).where(Budget.user_id == current_user.id)).all()
    response = []
    for budget in budgets:
        spent = db.scalar(
            select(func.coalesce(func.sum(Expense.amount), 0)).where(
                Expense.user_id == current_user.id,
                Expense.category == budget.category,
            )
        )
        response.append(serialize_budget(budget, spent))
    return response


@router.post("", response_model=BudgetRead, status_code=status.HTTP_201_CREATED)
def upsert_budget(payload: BudgetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = db.scalar(select(Budget).where(Budget.user_id == current_user.id, Budget.category == payload.category))
    if budget is None:
        budget = Budget(user_id=current_user.id, **payload.model_dump())
        db.add(budget)
    else:
        budget.limit_amount = payload.limit_amount
    db.commit()
    db.refresh(budget)
    spent = db.scalar(
        select(func.coalesce(func.sum(Expense.amount), 0)).where(
            Expense.user_id == current_user.id,
            Expense.category == budget.category,
        )
    )
    return serialize_budget(budget, spent)
