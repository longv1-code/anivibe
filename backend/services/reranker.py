import os
import json
from google import genai
from fastapi import HTTPException

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

async def rerank(results, intent, themes, vibes):
    truncated = [
        {
            "mal_url" : anime["mal_url"] if anime["mal_url"] else "N/A",
            "title" : anime["title"] if anime["title"] else "N/A",
            "score" : anime["score"] if anime["score"] else "N/A",
            "synopsis" : anime["synopsis"][:300] if anime["synopsis"] else "N/A"
        }
        for anime in results
    ]

    response = await client.aio.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=f"""
        Intent: {intent}
        Themes: {themes}
        Vibes: {vibes}
        Anime List: {json.dumps(truncated)}
        """,
        config={
            "system_instruction": 
            """
            You are a semantic anime re-ranker. Given a user's intent, themes, vibes and a list of anime, score each anime from 0-10 based on how well it matches the user's intent.

            Consider:
            - How closely the synopsis matches the intent and themes
            - Whether the vibe and tone matches
            - MAL score as a tiebreaker only

            Return ONLY a raw JSON array sorted by score descending:
            [
            {"mal_url": "https://...", "score": 9.2},
            {"mal_url": "https://...", "score": 8.1}
            ]

            Do NOT include markdown, backticks, or explanation. Return raw JSON only.
            """
        }
    )
    result = response.text.strip()
    if result.startswith("```"):
        result = result.split("```")[1]
        if result.startswith("json"):
            result = result[4:]
    try:
        scored_list = json.loads(result)
        results_map = {anime["mal_url"]: anime for anime in results}
        reranked = [
            results_map[item["mal_url"]]
            for item in scored_list
            if item["mal_url"] in results_map
        ]
        return reranked
    except Exception as e:
        print("ERROR:", str(e))
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))