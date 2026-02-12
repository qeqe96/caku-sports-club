from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Team
from schemas import TeamResponse, TeamCreate

router = APIRouter(prefix="/api/teams", tags=["teams"])


@router.get("", response_model=List[TeamResponse])
def get_teams(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Team)
    if category:
        query = query.filter(Team.category == category)
    return query.all()


@router.get("/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db)):
    return db.query(Team).filter(Team.id == team_id).first()


@router.post("", response_model=TeamResponse)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    db_team = Team(**team.model_dump())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team
