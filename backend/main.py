from fastapi import FastAPI
from routes import anime
from dotenv import load_dotenv

app = FastAPI()
app.include_router(anime.router)

load_dotenv()