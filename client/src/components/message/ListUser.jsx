import React from "react";

import ListItemText from "@mui/material/ListItemText";

import ListItem from "@mui/material/ListItem";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const ListUser = ({ user, persons, id }) => {
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    const friendId = persons.find(p => p !== user._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setInfoUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(infoUser);
    getUser();
  }, [user._id, persons]);

  return (
    <>
      {" "}
      <ListItem alignItems="flex-start" sx={{ cursor: "pointer" }}>
        <ListItemAvatar>
          {infoUser.avatar ? (
            <Avatar alt={infoUser.username} src={PF + infoUser.avatar} />
          ) : (
            <Avatar alt={infoUser.username} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={infoUser.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {" I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default ListUser;
