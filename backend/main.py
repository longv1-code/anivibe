'''
Front door of the entire application
It creates the FastAPI app instance, registers routers, 
and handles any app-wide configuration like CORS settings later. 
It doesn't know or care about anime specifically — 
it just knows "there's a router for anime, plug it in.
'''
from dotenv import load_dotenv
load_dotenv() # loads .env 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import anime

app = FastAPI() # creates FastAPI app instance

# allows port 5173 to call FastAPI port 8000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://anivibe-neon.vercel.app/"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(anime.router) # registers anime.py as a router
