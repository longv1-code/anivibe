'''
GPT logic 
'''

import os
import json
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

async def extract_search_params(query: str):
    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=query,
        config={
            "system_instruction": """

            Do not wrap the JSON in markdown code fences or backticks. Return raw JSON only.
            ensure it only returns json, no extra text or explaination around it
            if a field cannot be reasonably inferred from the query, leave it as null, don't guess
            query should always be filled in, everything else is optional

            GPT's role is the middle man where it will read a users natural language query and be able to return it in a json format that i want it to follow.

            Try to find popular and/or highly rate shows first.

            These input and output examples below are not absolute but just an example of how to structure a users query to what should be returned.

            input: "dark psychological thriller with a genius protagonist"
            output:
            {
            "query": "psychological thriller genius",
            "genre": "Psychological",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "funny high school romance anime with lots of episodes"
            output:
            {
            "query": "funny high school romance",
            "genre": "Romance",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 24
            }

            input: "best sci fi movies rated above 8"
            output:
            {
            "query": "science fiction futuristic",
            "genre": "Sci Fi",
            "min_score": 8.0,
            "type": "movie",
            "status": "complete",
            "min_episodes": 1
            }

            input: "airing sports anime with intense matches"
            output:
            {
            "query": "intense competition matches",
            "genre": "Sports",
            "min_score": 0.0,
            "type": "tv",
            "status": "airing",
            "min_episodes": 1
            }

            input: "short horror anime to binge tonight"
            output:
            {
            "query": "scary dark horror",
            "genre": "Horror",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "space adventure with military battles"
            output:
            {
            "query": "space war military",
            "genre": "Space",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "sad drama movie that will make me cry"
            output:
            {
            "query": "emotional tragic drama",
            "genre": "Drama",
            "min_score": 7.5,
            "type": "movie",
            "status": "complete",
            "min_episodes": 1
            }

            input: "completed fantasy anime with over 50 episodes"
            output:
            {
            "query": "fantasy adventure magic",
            "genre": "Fantasy",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 50
            }

            input: "supernatural mystery with detectives"
            output:
            {
            "query": "detective investigation supernatural",
            "genre": "Mystery",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "good action anime above 9 rating"
            output:
            {
            "query": "intense action fights",
            "genre": "Action",
            "min_score": 9.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "romantic comedy movie"
            output:
            {
            "query": "romantic comedy love",
            "genre": "Comedy",
            "min_score": 0.0,
            "type": "movie",
            "status": "complete",
            "min_episodes": 1
            }

            input: "psychological suspense anime that is already finished"
            output:
            {
            "query": "mind games suspense thriller",
            "genre": "Suspense",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "upcoming mecha anime"
            output:
            {
            "query": "robots futuristic battles",
            "genre": "Mecha",
            "min_score": 0.0,
            "type": "tv",
            "status": "upcoming",
            "min_episodes": 1
            }

            input: "award winning seinen series"
            output:
            {
            "query": "mature critically acclaimed",
            "genre": "Award Winning",
            "min_score": 8.5,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            input: "slice of life cooking anime"
            output:
            {
            "query": "relaxing cooking food",
            "genre": "Slice Of Life",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1
            }

            
            here are the types for each field and default values query: str, genre: str = None, min_score: float = None, type: str = None, status: str = None, min_episodes: int = None

            the only valid values for
            genre: Action	
            Adventure	
            Cars	
            Comedy	
            Avante Garde	
            Demons 	
            Mystery 	
            Drama	
            Ecchi	
            Fantasy	
            Game
            Hentai
            Historical
            Horror
            Kids
            Martial Arts
            Mecha	
            Music	
            Parody	
            Samurai	
            Romance	
            School	
            Sci Fi
            Shoujo
            Girls Love
            Shounen
            Boys Love	
            Space
            Sports	
            Super Power	
            Vampire
            Harem	
            Slice Of Life	
            Supernatural	
            Military
            Police	
            Psychological
            Suspense	
            Seinen
            Josei	
            Award Winning 	
            Gourmet	
            Work Life	
            Erotica

            type: tv, movie, ova, special, ona, music

            status: airing, complete, upcoming

            min_score: it can range from 0.0 to 10.0 or null
            min_episodes can start from integer 1 to infinity
            """
        }
    )
    result = response.text.strip()
    if result.startswith("```"):
        result = result.split("```")[1]
        if result.startswith("json"):
            result = result[4:]
    try:
        return json.loads(result)
    except:
        raise Exception("Gemini returned invalid JSON")