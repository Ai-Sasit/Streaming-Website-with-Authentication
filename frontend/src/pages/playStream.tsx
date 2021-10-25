import * as React from 'react';
import flv from 'flv.js';
import { fetchOneUser } from '../service/auth';
import { fetchStream } from '../service/stream';

function PlayStream(props: any) {
  const video = React.createRef<HTMLVideoElement>();
  const [stream, setStream] = React.useState(Object);
  const [user, setUser] = React.useState(Object);
  const key = props.match.params.key;
  var player:any = null;

  React.useEffect(() => {
      fetchStream(key).then((data: any) => {
          setStream(data);
          fetchOneUser(data.uid).then((result: any) => {
              setUser(result[0]);
          })
      }).catch((error: any) => {
          console.error(error.message);
      })
      buildPlayer();
        return () => {
            player.destroy();
        }// eslint-disable-next-line
  }, []);
  React.useEffect(() =>{
    buildPlayer();
})

  const buildPlayer = () => {
    const key = props.match.params.key;
    if (flv.isSupported() && stream && stream.video_path !== "null" && stream.video_path !== undefined) {
        player = flv.createPlayer({
            type: 'mp4',
            url: `http://localhost:9999/api/media/${stream.key}`
        });
        player.attachMediaElement(video.current);
        player.load();
    }else if (flv.isSupported() && stream){
        player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:5000/live/${key}.flv`
        });
        player.attachMediaElement(video.current);
        player.load();
    }
}

  if (!stream) {return null;}

  return (
    <div>
      <video ref={video} className="streamPlayer" controls></video>
      <div className="playerDesc">
        <h1>{stream.title}</h1>
        <p>{stream.description}</p>
        <h6>Stream by {user.username}</h6>
        <h6>Stream at {stream.time_created}</h6>
      </div>
    </div>
  );
}

export default PlayStream;
