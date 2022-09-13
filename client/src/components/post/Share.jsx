import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Button, makeStyles, Typography } from "@mui/material";
import LocationOn from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const Share = () => {
  return (
    <Box
      sx={{
        maxWidth: 800,

        height: 300,
        color: "#807c7c",
        background: "white",
        padding: 2,
        borderRadius: "10px",
        border: "none",

        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Stack
        sx={{ alignItems: "center", marginLeft: "auto", marginRight: "auto" }}
        spacing={0.5}
      >
        <Avatar
          variant="circle"
          src="avatar1.jpg"
          sx={{ width: "60px", height: "60px" }}
        />
        <Typography fontSize={20} fontWeight={600}>
          Sebastian Mazur
        </Typography>
      </Stack>
      <TextField
        placeholder="What do you think about now..."
        multiline
        rows={4}
        maxRows={6}
        style={{ width: "100%", maxWidth: 800, color: "white" }}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
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
        <Button color="success" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Share;
