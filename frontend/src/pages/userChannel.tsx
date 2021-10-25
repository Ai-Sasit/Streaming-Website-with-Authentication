import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteStream, fetchStreams } from '../service/stream';
import { getUser } from '../service/auth';
import { Redirect } from 'react-router';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [streams, setStreams] = React.useState(Array);

  const [Auth, setAuth] = React.useState(true);
  const [User, setUser] = React.useState(Object);

  React.useEffect(() => {
    fetchStreams().then((stream: any) => setStreams(stream));
    getUser()
    .then((data: any) => {
      setUser(data);
      setAuth(true);
    })
    .catch((error: any) => {
      setAuth(false);
      console.error(error.message);
    });
  },[])

  const handleDelete = (item: any) => {
    if (window.confirm(`Are you sure you want to delete the stream with title: ${item.title}`)) {
        deleteStream(item.key)
      }
  }

  const filters = streams.filter((s:any)=>{return s.uid === User.id})

  return !Auth?<Redirect to="/"/>:(
          <Demo sx={{width:"80%", mx: "auto", mt:5, mb:5}}>
            <List>
              {filters.map((stream: any) => (
                <ListItem
                  sx={{m:2, boxShadow:3}}
                  key={stream.key}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <VideoSettingsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={stream.title}
                    secondary={stream.time_created}
                  />
                  <ListItemText
                    primary={stream.description}
                    secondary={stream.key}
                  />
                  <IconButton edge="end" sx={{mr:2}} aria-label="edit" href={`/channel/update-stream/${stream.key}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" sx={{mr:2}} aria-label="delete" onClick={e => {handleDelete(stream)}}>
                      <DeleteIcon />
                    </IconButton>
                </ListItem>
              ))}
            </List>
          </Demo>
  );
}
