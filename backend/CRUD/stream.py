from fastapi.responses import FileResponse
from fastapi import APIRouter
from database import conn
from schemas import Stream, Video
from models import Streams

stream = APIRouter(tags=["Stream"])

@stream.get("/streams")
async def retrieve_all_streams():
    return conn.execute(Streams.select()).fetchall()

@stream.get("/stream/{key}")
async def retrieve_one_stream(key:str):
    return conn.execute(Streams.select().where(Streams.c.key == key)).fetchone()

@stream.post("/stream")
async def create_stream_details(req:Stream):
    conn.execute(Streams.insert().values(
        uid=req.uid,
        key=req.key,
        title=req.title,
        description=req.description,
        time_created=req.time_created,
        image_base64=req.image_base64,
        video_path=req.video_path
    ))
    return conn.execute(Streams.select()).fetchall()

@stream.patch("/stream/{key}")
async def update_stream_details(key:str,req:Stream):
    conn.execute(Streams.update().values(
	    title=req.title,
        description=req.description,
        image_base64=req.image_base64
    ).where(Streams.c.key == key))
    return conn.execute(Streams.select()).fetchall()

@stream.put("/stream/video/{key}")
async def insert_video_path(key:str,req:Video):
    conn.execute(Streams.update().where(Streams.c.key == key).values(video_path = req.video_path))
    return {"massage":"insert success"}

@stream.delete("/stream/{key}")
async def update_stream_details(key:str):
    conn.execute(Streams.delete().where(Streams.c.key == key))
    return conn.execute(Streams.select()).fetchall()

@stream.get("/media/{path}")
async def retrieve_media(path:str):
    media = conn.execute(Streams.select().where(Streams.c.key == path)).fetchone()
    return FileResponse(media[-1], media_type="video/mp4")