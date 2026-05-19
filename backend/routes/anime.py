'''
Department of the application
Everything anime search related
'''

from fastapi import APIRouter, HTTPException
from services import jikan
from pydantic import BaseModel
from services import gemini
from services import reranker

class SearchRequest(BaseModel):
    prompt: str

class FilterRequest(BaseModel):
    filters: dict

router = APIRouter() # creates APIRouter instance

@router.post("/anime/search") # POST to send data to server, cleaner URLs, semantically correct 
async def search_anime(request: SearchRequest):
    try:
        params = await gemini.extract_search_params(request.prompt) # calls openai function with prompt, return Python dict
        themes = params.pop("themes", None)
        vibes = params.pop("vibes", None)
        intent = params.pop("intent", None)
        results = await jikan.search_anime(**params) # ** operator unpacks Python dict into keyword args]
        try:
            results = await reranker.rerank(results, intent, themes, vibes)
        except Exception as e:
            print("Reranker failed, using original order:", e)
        return {"results" : results, "params" : params}
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/anime/filter")
async def filter_anime(request: FilterRequest):
    try:
        results = await jikan.search_anime(**request.filters)
        return {"results" : results, "params" : request.filters}
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))