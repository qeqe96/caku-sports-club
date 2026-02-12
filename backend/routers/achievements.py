from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Achievement
from schemas import AchievementResponse, AchievementCreate

router = APIRouter(prefix="/api/achievements", tags=["achievements"])


@router.get("", response_model=List[AchievementResponse])
def get_achievements(
    category: Optional[str] = Query(None), db: Session = Depends(get_db)
):
    query = db.query(Achievement)
    if category:
        query = query.filter(Achievement.category == category)
    return query.all()


@router.get("/{achievement_id}", response_model=AchievementResponse)
def get_achievement(achievement_id: int, db: Session = Depends(get_db)):
    return db.query(Achievement).filter(Achievement.id == achievement_id).first()


@router.post("", response_model=AchievementResponse)
def create_achievement(
    achievement: AchievementCreate, db: Session = Depends(get_db)
):
    db_achievement = Achievement(**achievement.model_dump())
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    return db_achievement
