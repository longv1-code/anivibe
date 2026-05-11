'''
Jikan API logic
'''

import httpx

JIKAN_BASE_URL = "https://api.jikan.moe/v4"

async def search_anime(query: str, genre: str = None, min_score: float = None, type: str = None, status: str = None, min_episodes: int = None):
    params = {"q": query, "limit": 20}

    # filters
    if genre:
        params["genre"] = genre
    if min_score:
        params["min_score"] = min_score
    if type:
        params["type"] = type
    if status:
        params["status"] = status
    if min_episodes:
        params["min_episodes"] = min_episodes

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{JIKAN_BASE_URL}/anime", params=params)
            response.raise_for_status()
            data = response.json()

            # data for each anime
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