"""Seed script to populate the database with demo data."""

from database import engine, SessionLocal, Base
from models import Team, Tournament, Achievement, Event

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear existing data
db.query(Achievement).delete()
db.query(Event).delete()
db.query(Tournament).delete()
db.query(Team).delete()
db.commit()

# ============================================================
# TEAMS
# ============================================================

teams_data = [
    # Spor takımları
    {
        "name": "ÇAKÜ Futbol Takımı",
        "category": "spor",
        "sport_type": "Futbol",
        "members_count": 22,
        "image_url": "/images/teams/futbol.jpg",
        "description": "Çankırı Karatekin Üniversitesi futbol takımı, üniversiteler arası liglerde başarıyla mücadele etmektedir.",
    },
    {
        "name": "ÇAKÜ Basketbol Takımı",
        "category": "spor",
        "sport_type": "Basketbol",
        "members_count": 15,
        "image_url": "/images/teams/basketbol.jpg",
        "description": "Basketbol takımımız bölgesel turnuvalarda üst sıralarda yer almaktadır.",
    },
    {
        "name": "ÇAKÜ Voleybol Takımı",
        "category": "spor",
        "sport_type": "Voleybol",
        "members_count": 14,
        "image_url": "/images/teams/voleybol.jpg",
        "description": "Kadın ve erkek voleybol takımlarımız üniversiteler arası müsabakalarda iddialıdır.",
    },
    {
        "name": "ÇAKÜ Masa Tenisi Takımı",
        "category": "spor",
        "sport_type": "Masa Tenisi",
        "members_count": 8,
        "image_url": "/images/teams/masa-tenisi.jpg",
        "description": "Masa tenisi takımımız bireysel ve takım kategorilerinde madalyalar kazanmıştır.",
    },
    # E-Spor takımları
    {
        "name": "ÇAKÜ Valorant Takımı",
        "category": "e-spor",
        "sport_type": "Valorant",
        "members_count": 7,
        "image_url": "/images/teams/valorant.jpg",
        "description": "Valorant takımımız üniversiteler arası e-spor liginde mücadele etmektedir.",
    },
    {
        "name": "ÇAKÜ League of Legends Takımı",
        "category": "e-spor",
        "sport_type": "League of Legends",
        "members_count": 7,
        "image_url": "/images/teams/lol.jpg",
        "description": "LoL takımımız UEL (Üniversite E-Spor Ligi) turnuvalarında aktif olarak yer almaktadır.",
    },
    {
        "name": "ÇAKÜ CS2 Takımı",
        "category": "e-spor",
        "sport_type": "Counter-Strike 2",
        "members_count": 6,
        "image_url": "/images/teams/cs2.jpg",
        "description": "CS2 takımımız ulusal e-spor turnuvalarında deneyim kazanmaktadır.",
    },
    {
        "name": "ÇAKÜ FIFA Takımı",
        "category": "e-spor",
        "sport_type": "EA FC",
        "members_count": 4,
        "image_url": "/images/teams/fifa.jpg",
        "description": "EA FC (FIFA) oyuncularımız bireysel ve takım turnuvalarında üniversitemizi temsil etmektedir.",
    },
]

db_teams = []
for t in teams_data:
    team = Team(**t)
    db.add(team)
    db.flush()
    db_teams.append(team)

# ============================================================
# TOURNAMENTS
# ============================================================

tournaments_data = [
    {
        "name": "Üniversiteler Arası Futbol Ligi 2026",
        "category": "spor",
        "date": "2026-03-15",
        "location": "Çankırı Stadyumu",
        "status": "upcoming",
        "description": "Türkiye geneli üniversiteler arası futbol turnuvası. Grup aşamasından itibaren tüm maçlar.",
        "image_url": "/images/tournaments/futbol-ligi.jpg",
    },
    {
        "name": "Bahar Basketbol Kupası",
        "category": "spor",
        "date": "2026-04-10",
        "location": "ÇAKÜ Spor Salonu",
        "status": "upcoming",
        "description": "Bölgesel üniversiteler arası basketbol turnuvası.",
        "image_url": "/images/tournaments/basketbol-kupasi.jpg",
    },
    {
        "name": "Kış Voleybol Turnuvası",
        "category": "spor",
        "date": "2026-01-20",
        "location": "Çankırı Kapalı Spor Salonu",
        "status": "completed",
        "description": "Kış dönemi voleybol turnuvası başarıyla tamamlandı.",
        "image_url": "/images/tournaments/voleybol-turnuvasi.jpg",
    },
    {
        "name": "UEL Valorant Şampiyonası",
        "category": "e-spor",
        "date": "2026-03-01",
        "location": "Online",
        "status": "ongoing",
        "description": "Üniversite E-Spor Ligi Valorant ana turnuvası. Takımımız çeyrek finalde!",
        "image_url": "/images/tournaments/uel-valorant.jpg",
    },
    {
        "name": "LOL Üniversite Kupası",
        "category": "e-spor",
        "date": "2026-04-20",
        "location": "Online",
        "status": "upcoming",
        "description": "League of Legends üniversiteler arası kupa turnuvası.",
        "image_url": "/images/tournaments/lol-kupa.jpg",
    },
    {
        "name": "CS2 Kampüs Turnuvası",
        "category": "e-spor",
        "date": "2026-02-15",
        "location": "ÇAKÜ Bilgisayar Lab",
        "status": "ongoing",
        "description": "Kampüs içi CS2 turnuvası devam ediyor!",
        "image_url": "/images/tournaments/cs2-kampus.jpg",
    },
]

for t in tournaments_data:
    db.add(Tournament(**t))

# ============================================================
# ACHIEVEMENTS
# ============================================================

achievements_data = [
    {
        "title": "Üniversiteler Arası Futbol - 3. lük",
        "category": "spor",
        "date": "2025-11-20",
        "description": "2025 Güz dönemi üniversiteler arası futbol turnuvasında 3. olduk!",
        "team_id": db_teams[0].id,
    },
    {
        "title": "Bölgesel Basketbol Şampiyonluğu",
        "category": "spor",
        "date": "2025-05-15",
        "description": "İç Anadolu bölgesi üniversiteler arası basketbol şampiyonluğu.",
        "team_id": db_teams[1].id,
    },
    {
        "title": "Voleybol Fair Play Ödülü",
        "category": "spor",
        "date": "2025-12-10",
        "description": "Kış turnuvasında fair play ödülüne layık görüldük.",
        "team_id": db_teams[2].id,
    },
    {
        "title": "UEL Valorant - Yarı Final",
        "category": "e-spor",
        "date": "2025-06-01",
        "description": "UEL 2025 Valorant turnuvasında yarı finale yükselme başarısı.",
        "team_id": db_teams[4].id,
    },
    {
        "title": "LoL Kampüs Şampiyonluğu",
        "category": "e-spor",
        "date": "2025-10-30",
        "description": "Kampüs içi League of Legends turnuvasında şampiyon olduk!",
        "team_id": db_teams[5].id,
    },
    {
        "title": "CS2 Online Turnuva - 2. lik",
        "category": "e-spor",
        "date": "2025-09-15",
        "description": "Ulusal üniversiteler arası CS2 online turnuvasında ikincilik.",
        "team_id": db_teams[6].id,
    },
]

for a in achievements_data:
    db.add(Achievement(**a))

# ============================================================
# EVENTS
# ============================================================

events_data = [
    {
        "title": "Spor Kulübü Tanıtım Günü",
        "category": "spor",
        "date": "2026-02-20",
        "location": "ÇAKÜ Ana Kampüs",
        "description": "Yeni dönem spor kulübü tanıtım etkinliği. Tüm branşlar hakkında bilgi alabilirsiniz.",
        "image_url": "/images/events/tanitim-gunu.jpg",
    },
    {
        "title": "Fitness & Sağlıklı Yaşam Semineri",
        "category": "spor",
        "date": "2026-03-05",
        "location": "ÇAKÜ Konferans Salonu",
        "description": "Uzman eğitmenler eşliğinde sağlıklı yaşam ve fitness semineri.",
        "image_url": "/images/events/fitness-seminer.jpg",
    },
    {
        "title": "E-Spor Oyuncu Alımları",
        "category": "e-spor",
        "date": "2026-02-25",
        "location": "ÇAKÜ Bilgisayar Lab",
        "description": "Valorant, LoL ve CS2 takımlarımız için yeni oyuncu seçmeleri başlıyor!",
        "image_url": "/images/events/oyuncu-alimlari.jpg",
    },
    {
        "title": "Gaming Night - Kampüs",
        "category": "e-spor",
        "date": "2026-03-12",
        "location": "ÇAKÜ Öğrenci Merkezi",
        "description": "Aylık gaming night etkinliğimiz. Turnuvalar, ödüller ve eğlence!",
        "image_url": "/images/events/gaming-night.jpg",
    },
]

for e in events_data:
    db.add(Event(**e))

db.commit()
db.close()

print("Seed data created successfully!")
print(f"  - {len(teams_data)} teams")
print(f"  - {len(tournaments_data)} tournaments")
print(f"  - {len(achievements_data)} achievements")
print(f"  - {len(events_data)} events")
