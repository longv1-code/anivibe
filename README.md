# Anime Recommender

A small web app that recommends anime using a Python backend and a Vite + React frontend.

**Features**
- Recommends anime based on user queries and preferences.
- Stores favorites and user profile data (frontend + backend integration).
- Integrates external services via `backend/services` (Jikan, Gemini, reranker).

**Tech stack**
- Backend: Python (see `backend/requirements.txt`)
- Frontend: Vite + React (see `frontend/package.json`)

**Repository layout**
- `backend/`: API server and prompt files
  - `main.py`: backend entrypoint
  - `routes/`: API route handlers
  - `services/`: integrations and helper modules
- `frontend/`: Vite + React app
  - `src/`: components, pages, and services

**Prerequisites**
- Python 3.10+ (or your project's required version)
- Node.js 16+ and npm or Yarn

**Setup & Run (quick)**

1) Backend (Windows PowerShell example)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

Notes: If your backend uses `uvicorn` or another ASGI server, run the server command (for example `uvicorn main:app --reload`).

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend Vite server will usually run on `http://localhost:5173` and the backend on the port configured in `backend/main.py` (or your ASGI server).

**Environment variables**
- Create `.env` files or set environment variables needed by the backend and frontend (API keys, Supabase keys, etc.).
- Common places to configure keys: `frontend/supabase.js` and `backend/` service modules.

**Development notes**
- Backend routes live in `backend/routes/` (see `routes/anime.py`, `routes/auth.py`).
- Service integrations are in `backend/services/` (Jikan, Gemini, reranker).
- Frontend components are in `frontend/src/components` and pages in `frontend/src/pages`.

**Testing & linting**
- Frontend linting is configured via `eslint.config.js` in `frontend/`.
- Add or run tests as appropriate to your stack.

**Next steps**
- Add an example `.env.example` documenting required variables.
- Add start scripts or a docker-compose file if you want a single command to run both services.

**License**
Add your license info here.

---

README updated with run instructions and quick setup.
