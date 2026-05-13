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
        print("USER QUERY:", request.prompt)
        params = await gemini.extract_search_params(request.prompt) # calls openai function with prompt
        print("GEMINI PARAMS:", params)
        results = await jikan.search_anime(**params) # ** operator unpacks Python dict into keyword args]
        print(results)
        return {"results" : results, "params" : params}
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))