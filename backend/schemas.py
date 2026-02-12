from pydantic import BaseModel
from typing import Optional, List


# --- Team ---
class TeamBase(BaseModel):
    name: str
    category: str
    sport_type: str
    members_count: int = 0
    image_url: Optional[str] = None
    description: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class TeamResponse(TeamBase):
    id: int

    class Config:
        from_attributes = True


# --- Tournament ---
class TournamentBase(BaseModel):
    name: str
    category: str
    date: str
    location: Optional[str] = None
    status: str = "upcoming"
    description: Optional[str] = None
    image_url: Optional[str] = None


class TournamentCreate(TournamentBase):
    pass


class TournamentResponse(TournamentBase):
    id: int

    class Config:
        from_attributes = True


# --- Achievement ---
class AchievementBase(BaseModel):
    title: str
    category: str
    date: str
    description: Optional[str] = None
    team_id: Optional[int] = None


class AchievementCreate(AchievementBase):
    pass


class AchievementResponse(AchievementBase):
    id: int

    class Config:
        from_attributes = True


# --- Event ---
class EventBase(BaseModel):
    title: str
    category: str
    date: str
    location: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True
