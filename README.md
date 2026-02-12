# ÇAKÜ Spor Kulübü Web Sitesi

Çankırı Karatekin Üniversitesi Spor Kulübü resmi web sitesi. Spor ve E-Spor kategorilerini içerir.

## Teknolojiler

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Framer Motion
- **Backend**: Python FastAPI, SQLAlchemy, SQLite

## Kurulum

### Backend

```bash
cd backend
pip install -r requirements.txt
python seed.py          # Demo verileri oluştur
uvicorn main:app --reload  # http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:3000
```

## API Endpoints

| Endpoint | Açıklama |
|---|---|
| `GET /api/teams?category=spor\|e-spor` | Takımları listele |
| `GET /api/tournaments?category=spor\|e-spor` | Turnuvaları listele |
| `GET /api/achievements?category=spor\|e-spor` | Başarıları listele |
| `GET /api/events?category=spor\|e-spor` | Etkinlikleri listele |

API dökümantasyonu: http://localhost:8000/docs
