from sqlalchemy import Table, Column , MetaData, ForeignKey
from sqlalchemy.sql.sqltypes import Boolean, Integer, String
from database import engine

meta = MetaData()

Users = Table('Users', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('username',String),
    Column('email', String),
    Column('is_superuser',Boolean),
    Column('password', String),
)

Streams = Table('Streams', meta,
    Column('uid', Integer, ForeignKey("Users.id")),
    Column('key', String, unique=True, primary_key=True),
    Column('title', String),
    Column('description', String),
    Column('time_created', String),
    Column('image_base64', String),
    Column('video_path', String),
)

meta.create_all(engine)