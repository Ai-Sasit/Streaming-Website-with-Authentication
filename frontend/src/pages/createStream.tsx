import {
  Button,
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import moment from 'moment';
import FileUpload from "@mui/icons-material/FileUpload";
import { getUser } from "../service/auth";
import { Redirect } from "react-router";
import { insertStream } from "../service/stream";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: theme.spacing(0),
  color: theme.palette.text.secondary,
}));

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const Input = styled("input")({
  display: "none",
});

function CreateStream() {

  const [Auth, setAuth] = React.useState(true);
  const [User, setUser] = React.useState(Object);

  const date_time = moment().format('dddd DD MMMM YYYY HH:mm');
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const key = React.useRef();
  const skey: any = key.current;

  React.useEffect(() => {
    getUser()
      .then((data: any) => {
        setUser(data);
        setAuth(true);
      })
      .catch((error: any) => {
        setAuth(false);
        console.error(error.message);
      });
  }, []);

  const handleCreate = (): void => {
      let payload = {
        uid: User.id,
        key: skey.value,
        title: title,
        description: description,
        time_created: date_time,
        image_base64: image,
        video_path: "null"
      }
      insertStream(payload);
  };

  const handlCancel = (): void => {
    window.location.replace("/");
  };

  const handleImage = (e: any): void => {
    const blah: any = document.getElementById("blah");
    let [img] = e.target.files;
    let Read = new FileReader();
    Read.onload = (e: any) => {
      blah.src = e.target.result;
      setImage(e.target.result);
    };
    Read.readAsDataURL(img);
  };

  return !Auth?<Redirect to="/"/>: (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "91.5vh", backgroundColor: "#282c34" }}
    >
      <Stack
        spacing={0}
        style={{ backgroundColor: "#ffffff95" }}
        sx={{ p: 2, mt: 5, mb: 5, width: "60vh" }}
      >
        <Item>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            align="center"
            mt={3}
          >
            Create Live Stream
          </Typography>
        </Item>
        <Item>{/*eslint-disable-next-line*/}
          <img src="https://wplook.com/wp-content/uploads/2018/05/increase-the-maximum-file-upload-size.jpg" width="90%" id="blah"/>
        </Item>
        <Item>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImage}
            />
            <Button
              variant="contained"
              color="info"
              startIcon={<FileUpload />}
              component="span"
              sx={{ width: "90%" }}
            >
              Select video cover
            </Button>
          </label>
        </Item>
        <Item>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            defaultValue={title}
            onChange={e=>{setTitle(e.target.value)}}
            sx={{ width: "90%" }}
          />
        </Item>
        <Item>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            defaultValue={description}
            onChange={e=>{setDescription(e.target.value)}}
            multiline
            rows={3}
            sx={{ width: "90%" }}
          />
        </Item>
        <Item>
          <TextField
            id="outlined-basic"
            label="Stream Key (Copy after all of form filled)"
            color="secondary"
            variant="outlined"
            size="small"
            value={guid()}
            inputRef={key}
            focused
            sx={{ width: "90%" }}
            inputProps={{ readOnly: true }}
          />
        </Item>
        <Item>
          <Button variant="contained" color="error" startIcon={<CancelIcon/>} onClick={handlCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleIcon/>}
            onClick={handleCreate}
            sx={{ ml: 2 }}
          >
            Create
          </Button>
        </Item>
        <Item></Item>
      </Stack>
    </Grid>
  );
}
export default CreateStream;
