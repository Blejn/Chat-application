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
const UsersPage = () => {
  const [friends, setFriends] = useState([]);
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
  console.log(friends);

  return (
    <div className="postpage_container">
      <React.Fragment>
        <Box square sx={{ pb: "50px" }}>
          <List sx={{ mb: 2 }}>
            <ListSubheader sx={{ bgcolor: "background.paper" }}>
              Active Users
            </ListSubheader>
            {friends.map(friend => (
              <Users
                id={friend._id}
                username={friend.username}
                avatar={friend.avatar}
              />
            ))}
          </List>
        </Box>
      </React.Fragment>
    </div>
  );
};

export default UsersPage;
