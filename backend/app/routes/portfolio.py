from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.portfolio import PortfolioPosition
from app.models.user import User
from app.schemas.portfolio import PortfolioPositionCreate, PortfolioPositionRead

router = APIRouter()


def serialize_position(position: PortfolioPosition) -> PortfolioPositionRead:
    market_value = position.quantity * position.current_price
    cost_basis = position.quantity * position.buy_price
    profit_loss = market_value - cost_basis
    profit_loss_percent = float((profit_loss / cost_basis) * 100) if cost_basis else 0
    return PortfolioPositionRead(
        id=position.id,
        stock_symbol=position.stock_symbol,
        company_name=position.company_name,
        quantity=position.quantity,
        buy_price=position.buy_price,
        current_price=position.current_price,
        market_value=market_value,
        profit_loss=profit_loss,
        profit_loss_percent=round(profit_loss_percent, 2),
    )


@router.get("", response_model=list[PortfolioPositionRead])
def list_positions(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    positions = db.scalars(select(PortfolioPosition).where(PortfolioPosition.user_id == current_user.id)).all()
    return [serialize_position(position) for position in positions]


@router.post("", response_model=PortfolioPositionRead, status_code=status.HTTP_201_CREATED)
def create_position(
    payload: PortfolioPositionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    position = PortfolioPosition(
        user_id=current_user.id,
        stock_symbol=payload.stock_symbol.upper(),
        company_name=payload.company_name,
        quantity=payload.quantity,
        buy_price=payload.buy_price,
        current_price=payload.current_price,
    )
    db.add(position)
    db.commit()
    db.refresh(position)
    return serialize_position(position)


@router.delete("/{position_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_position(position_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    position = db.get(PortfolioPosition, position_id)
    if position is None or position.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Position not found")
    db.delete(position)
    db.commit()
