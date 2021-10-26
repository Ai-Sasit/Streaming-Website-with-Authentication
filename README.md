# Streaming Website with Node-Media-Server
## Default User
  - Username: `admin`
  - Password: `asd123`
## Download ffmpeg and add to `/backend/App`
  - https://www.ffmpeg.org/download.html
## SQLAlchemy Database URL
  - https://docs.sqlalchemy.org/en/14/core/engines.html

## Setup
```
npm --prefix backend/app i
```
```
npm --prefix frontend i
```
```
cd backend && pip install -r requirements.txt
```

## Start
```
python run.py
```

#### Index Page `http://localhost:3000`
#### API URL - Swagger UI `http://localhost:9999/api/docs`
#### RTMP Server `http://localhost:5000/admin` username: `admin` password: `nms2021`
