from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date
from sqlalchemy.orm import relationship
from database import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(10), nullable=False)  # "spor" or "e-spor"
    sport_type = Column(String(50), nullable=False)
    members_count = Column(Integer, default=0)
    image_url = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)

    achievements = relationship("Achievement", back_populates="team")


class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(10), nullable=False)
    date = Column(String(20), nullable=False)
    location = Column(String(200), nullable=True)
    status = Column(String(20), default="upcoming")  # upcoming, ongoing, completed
    description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(10), nullable=False)
    date = Column(String(20), nullable=False)
    description = Column(Text, nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)

    team = relationship("Team", back_populates="achievements")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(10), nullable=False)
    date = Column(String(20), nullable=False)
    location = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
