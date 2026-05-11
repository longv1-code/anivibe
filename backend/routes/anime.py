'''
Department of the application
Everything anime search related
'''

from fastapi import APIRouter, HTTPException
from services import jikan
from pydantic import BaseModel
from services import gemini

class SearchRequest(BaseModel):
    prompt: str

router = APIRouter() # creates APIRouter instance

@router.post("/anime/search") # POST to send data to server, cleaner URLs, semantically correct 
async def search_anime(request: SearchRequest):
    try:
        params = await gemini.extract_search_params(request.prompt) # calls openai function with prompt
        results = await jikan.search_anime(**params) # ** operator unpacks Python dict into keyword args
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))