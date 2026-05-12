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

            You are an AI query parser for an anime recommendation/search system.

            Your ONLY job is to convert a user's natural language anime request into a valid JSON object.

            STRICT RULES:
            - Return ONLY raw JSON.
            - Do NOT wrap JSON in markdown code fences.
            - Do NOT explain anything.
            - Do NOT add extra text before or after the JSON.
            - Every response MUST be valid parseable JSON.
            - The "query" field must ALWAYS be filled.
            - If a field cannot reasonably be inferred, use null instead of guessing.
            - Keep the query concise and optimized for anime search relevance.
            - Extract important themes, moods, settings, and concepts into the query.
            - Prefer popular and/or highly rated anime when the user implies "best", "top", "popular", etc.
            - If the user asks for upcoming anime, min_score should usually be null because upcoming anime may not have scores yet.
            - If the user asks for low-rated/worst anime, set min_score to 0.0 and use appropriate ordering.
            - If the user specifies a movie, set type to "movie".
            - If the user specifies TV series, use "tv".
            - If the user specifies OVAs, ONAs, specials, or music anime, map them correctly.
            - If the user asks for shortest anime, sort episodes ascending.
            - If the user asks for longest anime, sort episodes descending.
            - If the user asks for highest rated anime:
                - use order_by = "score"
                - use sort = "desc"
            - If the user asks for lowest rated anime:
                - use order_by = "score"
                - use sort = "asc"
                - use min_score = 0.0
            - If the user asks for most popular anime:
                - use order_by = "popularity"
                - use sort = "desc"
            - If the user asks for least popular anime:
                - use order_by = "popularity"
                - use sort = "asc"
            - If the user asks for newest anime:
                - use order_by = "start_date"
                - use sort = "desc"
            - If the user asks for oldest/classic anime:
                - use order_by = "start_date"
                - use sort = "asc"
            - If the user asks for top ranked anime:
                - use order_by = "rank"
                - use sort = "asc"

            The JSON schema must ALWAYS follow this exact structure:

            {
            "query": string,
            "genre": string | null,
            "min_score": float | null,
            "type": string | null,
            "status": string | null,
            "min_episodes": integer | null,
            "order_by": string,
            "sort": string
            }

            DEFAULT VALUES:
            - genre = null
            - min_score = null
            - type = null
            - status = null
            - min_episodes = null
            - order_by = "popularity"
            - sort = "desc"

            VALID VALUES:

            genre:
            "Action"
            "Adventure"
            "Cars"
            "Comedy"
            "Avante Garde"
            "Demons"
            "Mystery"
            "Drama"
            "Ecchi"
            "Fantasy"
            "Game"
            "Hentai"
            "Historical"
            "Horror"
            "Kids"
            "Martial Arts"
            "Mecha"
            "Music"
            "Parody"
            "Samurai"
            "Romance"
            "School"
            "Sci Fi"
            "Shoujo"
            "Girls Love"
            "Shounen"
            "Boys Love"
            "Space"
            "Sports"
            "Super Power"
            "Vampire"
            "Harem"
            "Slice Of Life"
            "Supernatural"
            "Military"
            "Police"
            "Psychological"
            "Suspense"
            "Seinen"
            "Josei"
            "Award Winning"
            "Gourmet"
            "Work Life"
            "Erotica"

            type:
            "tv"
            "movie"
            "ova"
            "special"
            "ona"
            "music"

            status:
            "airing"
            "complete"
            "upcoming"

            order_by:
            "mal_id"
            "title"
            "start_date"
            "end_date"
            "episodes"
            "score"
            "scored_by"
            "rank"
            "popularity"
            "members"
            "favorites"

            sort:
            "desc"
            "asc"

            EXAMPLES:

            input:
            "highest rated psychological thriller movie"

            output:
            {
            "query": "mind games psychological thriller",
            "genre": "Psychological",
            "min_score": 8.5,
            "type": "movie",
            "status": "complete",
            "min_episodes": 1,
            "order_by": "score",
            "sort": "desc"
            }

            input:
            "lowest rated comedy anime"

            output:
            {
            "query": "funny comedy",
            "genre": "Comedy",
            "min_score": 0.0,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1,
            "order_by": "score",
            "sort": "asc"
            }

            input:
            "new upcoming fantasy anime"

            output:
            {
            "query": "magic fantasy adventure",
            "genre": "Fantasy",
            "min_score": null,
            "type": "tv",
            "status": "upcoming",
            "min_episodes": 1,
            "order_by": "start_date",
            "sort": "desc"
            }

            input:
            "anime with the most episodes"

            output:
            {
            "query": "long running series",
            "genre": null,
            "min_score": null,
            "type": "tv",
            "status": "complete",
            "min_episodes": 50,
            "order_by": "episodes",
            "sort": "desc"
            }

            input:
            "classic old sci fi anime"

            output:
            {
            "query": "retro futuristic sci fi",
            "genre": "Sci Fi",
            "min_score": null,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1,
            "order_by": "start_date",
            "sort": "asc"
            }

            input:
            "most favorited sci fi movies"

            output:
            {
            "query": "futuristic technology space",
            "genre": "Sci Fi",
            "min_score": 7.5,
            "type": "movie",
            "status": "complete",
            "min_episodes": 1,
            "order_by": "favorites",
            "sort": "desc"
            }

            input:
            "anime sorted alphabetically"

            output:
            {
            "query": "anime",
            "genre": null,
            "min_score": null,
            "type": "tv",
            "status": "complete",
            "min_episodes": 1,
            "order_by": "title",
            "sort": "asc"
            }

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