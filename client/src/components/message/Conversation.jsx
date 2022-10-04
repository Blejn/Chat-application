import React, { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import { Avatar } from "@mui/material";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { format } from "timeago.js";
export const Conversation = ({ currentChat, persons, user }) => {
  const [chatUser, setChatUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      var friendId = persons.find(p => p !== user._id);
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setChatUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [persons, user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat._id, messages]);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "80px",
          marginLeft: "auto",
          justifyContent: "center",
          maxWidth: "100%",

          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <Box
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            position: "relative",
            padding: "10px",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={PF + chatUser.avatar}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              alignItems: "center",
              position: "relative",

              justifyContent: "center",
            }}
          ></Avatar>
          {chatUser.username}
        </Box>
      </Box>
      {/* MESSAGES */}
      <Box>
        <Grid item xs={9}>
          <Box style={{ maxHeight: "500px", overflow: "auto" }}>
            <List sx={{ height: "60vh", overflowY: "auto" }}>
              {messages ? (
                messages.map(message => (
                  <ListItem key={message._id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align={message.sender === user._id ? "left" : "right"}
                          primary={message.text}
                          sx={
                            message.sender === user._id
                              ? {
                                  color: "white",
                                  backgroundColor: "#1976d2",
                                  textAlign: "left",
                                  float: "left",
                                  textOverflow: "ellipsis",
                                  maxWidth: "300px",
                                  padding: "10px",
                                  borderRadius: "20px",
                                }
                              : {
                                  textAlign: "right",
                                  float: "right",

                                  backgroundColor: "#19d238",
                                  borderRadius: "20px",
                                  padding: "10px",
                                  color: "white",
                                }
                          }
                        ></ListItemText>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary="10:30"
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))
              ) : (
                <span>no messages with this user</span>
              )}
            </List>
            <Divider />
          </Box>
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
