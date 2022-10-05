import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/icons-material/Input";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "@mui/material/Card";
import { Button, makeStyles, Typography } from "@mui/material";
import LocationOn from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import axios from "axios";

const Share = () => {
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async e => {
    e.preventDefault();
    //TAK POWINNO BYC
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      newPost.image = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts/createpost", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,

        color: "#807c7c",
        background: "white",
        padding: 2,
        borderRadius: "10px",
        border: "none",

        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
      }}
    >
      <Stack
        sx={{ alignItems: "center", marginLeft: "auto", marginRight: "auto" }}
        spacing={0.5}
      >
        <Avatar
          variant="circle"
          src={PF + user.avatar}
          sx={{ width: "60px", height: "60px" }}
        />
        <Typography fontSize={20} fontWeight={600}>
          {user.firstname} {user.lastname}
        </Typography>
      </Stack>
      <form onSubmit={submitHandler}>
        <textarea
          type={"text"}
          placeholder={"What do you think about now..." + user.firstname + "?"}
          multiline
          rows={5}
          maxRows={6}
          style={{
            width: "100%",
            maxWidth: 800,
            color: "black",
            height: "50px",
          }}
          ref={desc}
        />
        {file && (
          <Box
            sx={{
              display: "flex",
              maxWidth: "300px",
              maxHeight: "200px",
              padding: "0 20px 10px 20px",
              position: "relative",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src={URL.createObjectURL(file)}
            />
            <CancelIcon
              onClick={() => {
                setFile(null);
              }}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              id="file"
              onChange={e => setFile(e.target.files[0])}
            />
            <ImageIcon />
          </IconButton>

          <IconButton>
            <AddReactionIcon sx={{ color: "#cead27" }} />
          </IconButton>
          <IconButton>
            <LocationOn color="grey" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            type="submit"
            color="success"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Share;
