import React, { useState, useContext, useRef } from "react";
import "./chat.css";
import List from "@mui/material/List";

import Collapse from "@mui/material/Collapse";

import ListUser from "../../components/message/ListUser";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import { Conversation } from "../../components/message/Conversation";
import Navbar from "../navbar/Navbar";
import UsersPage from "../../components/userspage/UsersPage";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { io } from "socket.io-client";
import { axiosInstance } from "../../config";
const Chat = () => {
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = React.useState(true);
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  //SOCKET
  useEffect(() => {
    socket.current = io("https://blejn-socket-chat.herokuapp.com");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(
        user.followings.filter(f => users.some(u => u.userId === f))
      );
      console.log(users);
    });
  }, [user]);
  // FETCHING CONVERSATIONS FROM DATABASE
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get("conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, [user._id]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar />
      <div className="chat_container">
        <div style={{ flex: 2.5, paddingTop: "60px" }}>
          {/* USERS WITH WHO YOU CHAT */}
          <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: "25ch", padding: "5px", margin: "5px" }}>
              <OutlinedInput
                sx={{ height: "30px" }}
                placeholder="Enter the user"
              />
            </FormControl>
          </Box>
          {/* USERS CHAT */}
          <Box style={{ maxHeight: "400px", overflow: "auto" }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* USER CHAT */}

                {conversations.map(conversation => (
                  <div onClick={() => setCurrentChat(conversation)}>
                    <ListUser
                      user={user}
                      id={conversation._id}
                      persons={conversation.persons}
                    />
                  </div>
                ))}
              </List>
            </Collapse>
          </Box>
        </div>

        {/* CHAT BLOCK */}
        <div style={{ flex: 6.5, paddingTop: "60px" }}>
          {currentChat !== null ? (
            <Conversation
              currentChat={currentChat}
              persons={currentChat != null ? currentChat.persons : null}
              user={user}
              socket={socket}
            />
          ) : (
            <> NO CONVERSATION SELECTED</>
          )}
        </div>

        {/* ACTIVE USERS */}
        <div style={{ flex: 1.5 }}>
          <UsersPage
            setCurrentChat={setCurrentChat}
            onlineUsers={onlineUsers}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
