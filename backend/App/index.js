const NodeMediaServer = require('node-media-server');
const fs = require('fs')
const moment = require('moment');
const { default: axios } = require('axios');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 5000,
    mediaroot: './media',
    allow_origin: '*'
  },
  auth: {
    api : true,
    api_user: 'admin',
    api_pass: 'nms2021',
  },
  trans: {
    ffmpeg: 'ffmpeg/bin/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      }
    ]
  }
};

const nms = new NodeMediaServer(config)

nms.run();

nms.on('donePublish', async (id, StreamPath, args) => {
  let arr = `${StreamPath}`.split("/"); let key = arr[arr.length - 1];
  let files = fs.readdirSync(`./media/live/${key}`)
  let video_path = `backend\\App\\media\\live\\${key}\\${files}`;
  await axios.put(`http://localhost:9999/api/stream/video/${key}`, {video_path: video_path}).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error.message);
  })
  
})