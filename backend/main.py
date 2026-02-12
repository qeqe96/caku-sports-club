from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import teams, tournaments, achievements, events

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ÇAKÜ Spor Kulübü API",
    description="Çankırı Karatekin Üniversitesi Spor Kulübü Backend API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(teams.router)
app.include_router(tournaments.router)
app.include_router(achievements.router)
app.include_router(events.router)


@app.get("/")
def root():
    return {"message": "ÇAKÜ Spor Kulübü API", "docs": "/docs"}
