import csv
from datetime import datetime
from io import StringIO

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.expense import Expense
from app.models.user import User
from app.services.categorizer import categorize_transaction

router = APIRouter()


@router.post("/csv", status_code=status.HTTP_201_CREATED)
async def import_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    contents = (await file.read()).decode("utf-8")
    reader = csv.DictReader(StringIO(contents))
    if reader.fieldnames is None:
        raise HTTPException(status_code=400, detail="CSV file is empty")

    normalized = {column.lower().strip(): column for column in reader.fieldnames}
    required = {"date", "description", "amount"}
    if not required.issubset(normalized):
        raise HTTPException(status_code=400, detail="CSV must include date, description, and amount columns")

    created = 0
    for row in reader:
        description = str(row[normalized["description"]])
        amount = abs(float(row[normalized["amount"]]))
        expense = Expense(
            user_id=current_user.id,
            amount=amount,
            description=description,
            category=categorize_transaction(description),
            date=datetime.fromisoformat(row[normalized["date"]]).date(),
        )
        db.add(expense)
        created += 1
    db.commit()
    return {"imported": created}
