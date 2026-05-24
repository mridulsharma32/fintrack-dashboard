from decimal import Decimal

from pydantic import BaseModel, Field


class PortfolioPositionBase(BaseModel):
    stock_symbol: str = Field(min_length=1, max_length=20)
    company_name: str = Field(default="", max_length=160)
    quantity: Decimal = Field(gt=0)
    buy_price: Decimal = Field(gt=0)
    current_price: Decimal = Field(gt=0)


class PortfolioPositionCreate(PortfolioPositionBase):
    pass


class PortfolioPositionRead(PortfolioPositionBase):
    id: int
    market_value: Decimal
    profit_loss: Decimal
    profit_loss_percent: float

    model_config = {"from_attributes": True}
