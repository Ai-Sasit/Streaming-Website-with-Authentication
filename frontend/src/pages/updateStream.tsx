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
  import FileUpload from "@mui/icons-material/FileUpload";
  import { getUser } from "../service/auth";
  import { Redirect } from "react-router";
  import { fetchStream, updateStream } from "../service/stream";
  import CancelIcon from '@mui/icons-material/Cancel';
  import UpdateIcon from '@mui/icons-material/Update';
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: theme.spacing(0),
    color: theme.palette.text.secondary,
  }));
  
  const Input = styled("input")({
    display: "none",
  });
  
  function UpdateStream(props: any) {
  
    const [Auth, setAuth] = React.useState(true);
    const [stream, setStream] = React.useState(Object);
  
    const key = props.match.params.key;
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
  
    React.useEffect(() => {
      getUser()
        .then((data: any) => {
          setAuth(true);
        })
        .catch((error: any) => {
          setAuth(false);
          console.error(error.message);
        });
        fetchStream(key).then((data: any) => {
            setStream(data);
        }).catch((error: any) => {
            console.error(error.message);
        })// eslint-disable-next-line
    }, []);
  
    const handleUpdate = (): void => {
        let payload = {
          uid: stream.uid,
          key: stream.key,
          time_created: stream.time_created,
          video_path: stream.video_path,
          title: title===""? stream.title : title,
          description: description===""? stream.description: description,
          image_base64: image===""? stream.image_base64 : image,
        }
        console.log(payload);
        updateStream(payload, stream.key);
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

    if (!stream.title){return null;}
  
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
            <img src={stream.image_base64} width="90%" id="blah"/>
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
              defaultValue={stream.title}
              focused
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
              focused
              defaultValue={stream.description}
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
              color="error"
              variant="outlined"
              size="small"
              value={key}
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
              startIcon={<UpdateIcon/>}
              onClick={handleUpdate}
              sx={{ ml: 2 }}
            >
              Update
            </Button>
          </Item>
          <Item></Item>
        </Stack>
      </Grid>
    );
  }
  export default UpdateStream;
  