# AniVibe 🎌

A fullstack anime recommender that lets users query a **20,000+ record dataset** using natural language. Powered by Google Gemini for NL-to-SQL translation, Jikan API for live anime data, and a custom reranking pipeline for relevance scoring.

Live Demo: [anivibe-neon.vercel.app](https://anivibe-neon.vercel.app)

> "What are some dark psychological anime from the 2010s with a strong female lead?" — AniVibe understands that.

---

## What Makes It Different

Most anime apps filter by genre and score. AniVibe lets you describe what you want in plain English and translates that into a precise database query using Gemini's language model. The result is recommendations that match intent, not just tags.

---

## Features

- **Natural language search** — Gemini API translates user queries into SQL against a 20,000+ record anime dataset
- **Smart reranking** — custom reranker pipeline scores and re-orders results by relevance
- **Live anime data** — Jikan API integration pulls real-time metadata (scores, episodes, status)
- **Favorites system** — users can save and manage a personal anime list
- **User profiles** — auth-backed profiles with preference history

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Python, FastAPI |
| AI / NLP | Google Gemini API (NL-to-SQL) |
| Anime Data | Jikan API (MyAnimeList) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |

---

## Architecture

```
User Query (natural language)
        ↓
  Gemini API (NL → SQL)
        ↓
  PostgreSQL via Supabase (20,000+ anime records)
        ↓
  Reranker (relevance scoring)
        ↓
  Jikan API (live metadata enrichment)
        ↓
  React Frontend (results + favorites)
```

---

## Project Structure

```
anivibe/
├── backend/
│   ├── main.py               ← FastAPI entry point
│   ├── routes/
│   │   ├── anime.py          ← recommendation endpoints
│   │   └── auth.py           ← auth endpoints
│   ├── services/
│   │   ├── gemini.py         ← NL-to-SQL via Gemini API
│   │   ├── jikan.py          ← live anime metadata
│   │   └── reranker.py       ← relevance scoring pipeline
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── components/       ← reusable UI components
        ├── pages/            ← full page views
        └── services/         ← API call layer
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A Supabase project with the anime dataset loaded
- Google Gemini API key

### Environment Variables

Create a `.env` file in `backend/`:

```
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

Create a `.env` file in `frontend/`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

### Run Locally

**Backend:**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

```
POST  /api/anime/recommend     ← natural language query → recommendations
GET   /api/anime/:id           ← single anime detail
POST  /api/favorites           ← save to favorites
GET   /api/favorites/:userId   ← get user favorites
POST  /api/auth/register       ← register
POST  /api/auth/login          ← login
```

---

## Key Technical Decisions

**Why Gemini for NL-to-SQL?** The dataset has rich filterable fields (genre, year, score, episodes, status). Gemini reliably translates vague natural language intent into precise SQL filters without needing a custom-trained model.

**Why FastAPI?** Async support handles concurrent Gemini + Jikan API calls cleanly. Auto-generated OpenAPI docs made frontend integration faster.

**Why Supabase?** Managed PostgreSQL with a built-in auth layer and real-time capabilities — lets the project focus on the recommendation logic rather than infrastructure.

---

## Author

Long Vo — [GitHub](https://github.com/longv1-code)
