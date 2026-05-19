'''
GPT logic 
'''

import os
import json
from pathlib import Path
from google import genai

SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "prompts" / "anime_query_system.txt"
SYSTEM_INSTRUCTION = SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

async def extract_search_params(query: str):
    response = await client.aio.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=query,
        config={
            "system_instruction": SYSTEM_INSTRUCTION
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