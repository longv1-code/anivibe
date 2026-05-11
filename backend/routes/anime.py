'''
Department of the application
Everything anime search related
'''

from fastapi import APIRouter, HTTPException
from services import jikan

router = APIRouter()

@router.get("/anime/search")
async def search_anime(query: str, genre: str = None, min_score: float = None, type: str = None, status: str = None, min_episodes: int = None):
    try:
        results = await jikan.search_anime(query, genre, min_score, type, status, min_episodes)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))