from datetime import date as date_type
from decimal import Decimal

from pydantic import BaseModel, Field


class ExpenseBase(BaseModel):
    amount: Decimal = Field(gt=0)
    category: str = Field(min_length=2, max_length=80)
    description: str = Field(min_length=1, max_length=255)
    date: date_type


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    amount: Decimal | None = Field(default=None, gt=0)
    category: str | None = Field(default=None, min_length=2, max_length=80)
    description: str | None = Field(default=None, min_length=1, max_length=255)
    date: date_type | None = None


class ExpenseRead(ExpenseBase):
    id: int

    model_config = {"from_attributes": True}
