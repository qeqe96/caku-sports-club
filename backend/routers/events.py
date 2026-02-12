from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db
from models import Event
from schemas import EventResponse, EventCreate

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("", response_model=List[EventResponse])
def get_events(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Event)
    if category:
        query = query.filter(Event.category == category)
    return query.all()


@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    return db.query(Event).filter(Event.id == event_id).first()


@router.post("", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
