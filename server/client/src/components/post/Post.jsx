import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { format } from "timeago.js";
import { Comment } from "./Comment";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import axios from "axios";
import { useRef } from "react";
const Image = styled("img")({
  width: "100%",
});
const Post = ({
  id,
  description,
  image,
  createdAt,
  userId,
  comments,
  reactions,
}) => {
  const com = useRef();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const [user, setUser] = useState({});
  const [text, setText] = useState("FOLLOW USER");
  const { user: currentUser } = useContext(AuthContext);
  const [reaction, setReaction] = useState(reactions.length);
  const [isReaction, setIsReaction] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    currentUser.followings.includes(user?._id)
  );
  const [newComment, setNewComment] = useState("");
  const followHandler = async () => {
    try {
      await axiosInstance.put("/users/" + user._id + "/follow", {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setText("NOW YOU FOLLOW THIS USER!");
  };
  const reactionHandler = () => {
    try {
      axiosInstance.put("posts/" + id + "/reaction", {
        userId: currentUser._id,
      });
      setReaction(!isReaction ? reaction + 1 : reaction - 1);
      setIsReaction(!isReaction);
    } catch (error) {}
  };
  useEffect(() => {
    setIsReaction(reactions.includes(currentUser._id));
  }, [currentUser._id, reactions]);

  const handlerSubmit = async e => {
    const newComment = {
      userId: currentUser._id,
      text: com.current.value,
      postId: id,
    };
    try {
      await axiosInstance.put("/posts/" + id + "/comment", newComment);
    } catch (error) {
      console.log(error);
    }
  };
  const openHandler = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  const commentSection = () => {
    setOpenComment(!openComment);
  };
  return (
    <Card
      key={id}
      sx={{
        marginTop: "30px",
        backgroundColor: "#d6d6d6",
        maxWidth: 800,
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        transform: "all 0.5s",
      }}
    >
      <CardContent>
        <div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: 1 }}>
              {loading ? (
                <Skeleton variant="circular">
                  <Link to={`/profile/${user.username}`}>
                    <Avatar crossorigin src={PF + user.avatar} />
                  </Link>
                </Skeleton>
              ) : (
                <Link to={`/profile/${user.username}`}>
                  <Avatar crossorigin src={PF + user.avatar} />
                </Link>
              )}
            </Box>

            <Box sx={{ width: "100%", display: "flex" }}>
              {loading ? (
                <Skeleton width="100%">
                  <Link to={`/profile/${user.username}`}>
                    <Typography>.</Typography>
                  </Link>
                </Skeleton>
              ) : (
                <Typography>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/profile/${user.username}`}
                  >
                    {user.username}
                  </Link>
                  <br />
                  <small style={{ position: "relative", right: 0 }}>
                    {format(createdAt)}
                  </small>
                </Typography>
              )}
            </Box>
          </Box>
          {loading ? (
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: "57%" }} />
            </Skeleton>
          ) : (
            <Image src={PF + image} alt="" />
          )}
        </div>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color={isReaction ? "error" : "primary"}
          aria-label="upload picture"
          component="label"
          onClick={reactionHandler}
        >
          <FavoriteIcon />
          <small style={{ fontSize: 12, marginLeft: 10 }}>
            {reaction} people like it
          </small>
        </IconButton>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <CommentIcon />
          <small
            style={{ fontSize: 12, marginLeft: 10 }}
            onClick={commentSection}
          >
            {comments.length} people comments
          </small>
        </IconButton>
        {currentUser.followings.some(id => id === user?._id) ||
        currentUser._id === userId ? (
          <></>
        ) : (
          <Button onClick={{ followHandler }} sx={{ marginLeft: "20px" }}>
            {text}
          </Button>
        )}
      </CardActions>
      {openComment ? (
        <Box>
          <Grid container style={{ verticalAlign: "middle", padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                inputRef={com}
                id="outlined-basic-email"
                margin="normal"
                fullWidth
                label="Add comment..."
                onChange={""}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                onClick={handlerSubmit}
                sx={{ marginTop: "15px" }}
                color="primary"
                aria-label="add"
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
          {comments?.map(comment => {
            return <Comment comment={comment} />;
          })}
        </Box>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Post;
