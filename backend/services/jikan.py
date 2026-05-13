'''
Jikan API logic
'''

import httpx

JIKAN_BASE_URL = "https://api.jikan.moe/v4"

GENRE_MAP = {
    "Action" : 1,
    "Adventure" : 2,
    "Cars" : 3,
    "Comedy" : 4, 
    "Avante Garde" : 5,
    "Demons" : 6,
    "Mystery" : 7,
    "Drama" : 8,
    "Ecchi" : 9,
    "Fantasy" : 10,
    "Game" : 11,
    "Hentai" : 12,
    "Historical" : 13,
    "Horror" : 14,
    "Kids" : 15,
    "Martial Arts" : 17,
    "Mecha" : 18,
    "Music" : 19,
    "Parody" : 20,
    "Samurai" : 21,
    "Romance" : 22,
    "School" : 23,
    "Sci Fi" : 24,
    "Shoujo" : 25,
    "Girls Love" : 26,
    "Shounen" : 27,
    "Boys Love" : 28,
    "Space" : 29,
    "Sports" : 30,
    "Super Power" : 31, 
    "Vampire" : 32,
    "Harem" : 35,
    "Slice Of Life" : 36,
    "Supernatural" : 37, 
    "Military" : 38,
    "Police" : 39,
    "Psychological" : 40,
    "Suspense" : 41,
    "Seinen" : 42,
    "Josei" : 43,
    "Award Winning" : 46,
    "Gourmet" : 47,
    "Work Life" : 48,
    "Erotica" : 49,
}

async def search_anime(query: str = None, genres: list = None, min_score: float = None, type: str = None, status: str = None, min_episodes: int = None, order_by: str = "popularity", sort: str = "asc"):
    params = {"limit": 21, "min_score": min_score, "order_by": order_by, "sort": sort}

    # filters
    if query:
        params["q"] = query
    if genres:
        genre_ids = [str(GENRE_MAP.get(g.title())) for g in genres if GENRE_MAP.get(g.title())]
        if genre_ids:
            params["genres"] = ",".join(genre_ids)
    if type:
        params["type"] = type
    if status:
        params["status"] = status
    if min_episodes:
        params["min_episodes"] = min_episodes
    if min_score:
        params["min_score"] = min_score
    print("JIKAN PARAMS:", params)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{JIKAN_BASE_URL}/anime", params=params)
            response.raise_for_status()
            data = response.json()

            # data for each anime as Python dict
            results = [
                {
                    "title": anime["title"],
                    "score": anime["score"] if anime["score"] else "N/A",
                    "mal_url": anime["url"],
                    "type": anime["type"],
                    "episodes": anime["episodes"],
                    "status": anime["status"],
                    "genres": [g["name"] for g in anime["genres"]],
                    "image": anime["images"]["jpg"]["large_image_url"],
                    "synopsis": anime["synopsis"],
                    "studios": [s["name"] for s in anime["studios"]]
                }
                for anime in data["data"]
            ]

            return results

    except httpx.RequestError:
        raise Exception("Could not connect to Jikan API")
    except httpx.HTTPStatusError:
        raise Exception("Jikan API returned an error")