'''
Front door of the entire application
It creates the FastAPI app instance, registers routers, 
and handles any app-wide configuration like CORS settings later. 
It doesn't know or care about anime specifically — 
it just knows "there's a router for anime, plug it in.
'''

from fastapi import FastAPI
from routes import anime
from dotenv import load_dotenv

app = FastAPI() # creates FastAPI app instance
app.include_router(anime.router) # registers anime.py as a router

load_dotenv() # loads .env 