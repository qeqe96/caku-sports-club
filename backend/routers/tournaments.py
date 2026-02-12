from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Tournament
from schemas import TournamentResponse, TournamentCreate

router = APIRouter(prefix="/api/tournaments", tags=["tournaments"])


@router.get("", response_model=List[TournamentResponse])
def get_tournaments(
    category: Optional[str] = Query(None), db: Session = Depends(get_db)
):
    query = db.query(Tournament)
    if category:
        query = query.filter(Tournament.category == category)
    return query.all()


@router.get("/{tournament_id}", response_model=TournamentResponse)
def get_tournament(tournament_id: int, db: Session = Depends(get_db)):
    return db.query(Tournament).filter(Tournament.id == tournament_id).first()


@router.post("", response_model=TournamentResponse)
def create_tournament(tournament: TournamentCreate, db: Session = Depends(get_db)):
    db_tournament = Tournament(**tournament.model_dump())
    db.add(db_tournament)
    db.commit()
    db.refresh(db_tournament)
    return db_tournament
