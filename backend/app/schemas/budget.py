from decimal import Decimal

from pydantic import BaseModel, Field


class BudgetBase(BaseModel):
    category: str = Field(min_length=2, max_length=80)
    limit_amount: Decimal = Field(gt=0)


class BudgetCreate(BudgetBase):
    pass


class BudgetRead(BudgetBase):
    id: int
    spent_amount: Decimal = Decimal("0")
    remaining_amount: Decimal = Decimal("0")
    usage_percent: float = 0

    model_config = {"from_attributes": True}
