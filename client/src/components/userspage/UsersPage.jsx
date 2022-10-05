import React, { useState } from "react";
import Users from "../post/Users";
import "./userspage.css";
import { List } from "@mui/material";
import Paper from "@mui/material/Paper";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import UsersOffline from "../post/UsersOffline";
const UsersPage = ({ setCurrentChat, onlineUsers }) => {
  console.log(onlineUsers);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [offlineFriends, setOfflineFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("users/followings/" + user._id);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [user._id]);

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers?.includes(f._id)));
  }, [onlineUsers, friends]);
  console.log(onlineUsers);

  useEffect(() => {
    setOfflineFriends(friends.filter(f => !onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async friend => {
    try {
      const res = await axios.get(
        "/conversations/find/" + user._id + "/" + friend._id
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="postpage_container">
      <React.Fragment>
        <Box square sx={{ pb: "50px" }}>
          <List sx={{ mb: 2 }}>
            <ListSubheader sx={{ bgcolor: "background.paper" }}>
              Online Users
            </ListSubheader>
            {onlineFriends.map(friend => (
              <Users
                id={friend._id}
                username={friend.username}
                avatar={friend.avatar}
              />
            ))}
          </List>
          <List sx={{ mb: 2 }}>
            <ListSubheader sx={{ bgcolor: "background.paper" }}>
              Offline Users
            </ListSubheader>
            {offlineFriends.map(friend => (
              <div onClick={() => handleClick(friend)}>
                <UsersOffline
                  id={friend._id}
                  username={friend.username}
                  avatar={friend.avatar}
                />
              </div>
            ))}
          </List>
        </Box>
      </React.Fragment>
    </div>
  );
};

export default UsersPage;
