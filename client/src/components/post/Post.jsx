import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { format } from "timeago.js";

import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { Avatar } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [reaction, setReaction] = useState(reactions.length);
  const [isReaction, setIsReaction] = useState(false);

  const reactionHandler = () => {
    try {
      axios.put("posts/" + id + "/reaction", { userId: currentUser._id });
      setReaction(!isReaction ? reaction + 1 : reaction - 1);
      setIsReaction(!isReaction);
    } catch (error) {}
  };
  useEffect(() => {
    setIsReaction(reactions.includes(currentUser._id));
  }, [currentUser._id, reactions]);

  const openHandler = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

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
                  <small style={{ marginLeft: "600px" }}>
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
            <Image
              // src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
              src={PF + image}
              alt=""
            />
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
          <small style={{ fontSize: 12, marginLeft: 10 }}>
            {comments.length}people comments
          </small>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
