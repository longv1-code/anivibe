from fastapi import FastAPI
from routes import anime

app = FastAPI()
app.include_router(anime.router)