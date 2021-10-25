from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    email: str
    is_superuser: bool
    password: str

class Stream(BaseModel):
    uid: int
    key: str
    title: str
    description: str
    time_created: str
    image_base64: str
    video_path: str

class Video(BaseModel):
    video_path: str
    
class Login(BaseModel):
	username: str
	password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id:Optional[int] = None
    username: Optional[str] = None
    email: Optional[str] = None
    is_superuser: Optional[bool] = None