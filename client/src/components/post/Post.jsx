import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";

const Image = styled("img")({
  width: "100%",
});
const Post = ({
  id,
  description,
  username,
  image,
  userId,
  comments,
  reactions,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const color = "";
  const [reaction, setReaction] = useState(reactions);
  const [isReaction, setIsReaction] = useState(false);

  const reactionHandler = () => {
    isReaction ? reactions.pop(username) : reaction.push(username);

    setIsReaction(!isReaction);
  };

  const openHandler = () => {
    setOpen(!open);
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
      }}
    >
      <CardContent>
        <div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ margin: 1 }}>
              {loading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              {loading ? (
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              ) : (
                <Typography>{username}</Typography>
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
              src={image}
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
            {reactions.length} people like it
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
