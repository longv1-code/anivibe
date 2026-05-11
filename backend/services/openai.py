'''
GPT logic 
'''

import os
import json
from openai import AsyncOpenAI

api_key = os.environ.get("OPENAI_API_KEY")

client = AsyncOpenAI(api_key=api_key)
async def extract_search_params(query: str):
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", 
            "content": 
            """
            GPT's role is the middle man where it will read a users natural language query and be able to return it in a json format that i want it to follow.
            input: "dark psychological thriller with a genius protagonist" output: { "query": "psychological thriller genius", "genre": "Psychological", "min_score": 7.5 }
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

            ensure it only returns json, no extra text or explaination around it
            if a field cannot be reasonably inferred from the query, leave it as null, don't guess
            query should always be filled in, everything else is optional
            """
            },
            {"role": "user", "content": query}
        ]
    )

    result = response.choices[0].message.content

    try:
        return json.loads(result) # converts json string into Python dict
    except:
        raise Exception("GPT returned invalid JSON")