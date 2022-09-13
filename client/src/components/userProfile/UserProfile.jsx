import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import Container from "@mui/material/Container";
import "./userProfile.css";
import Typography from "@mui/material/Typography";
import BackgroundImage from "../../assets/zdj.jpg";
import Post from "../post/Post";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Add from "@mui/icons-material/Add";
const posts = [
  {
    id: 1,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro"],
    reactions: [1, 2, 3, 4],
  },
  {
    id: 2,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro"],
    reactions: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 3,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro", "pozdro", "pozdro", "pozdro"],
    reactions: [1, 2],
  },
  {
    id: 4,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro"],
    reactions: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 5,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro", "pozdro", "pozdro", "pozdro"],
    reactions: [1, 2, 3, 4, 5],
  },
  {
    id: 6,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro"],
    reactions: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 7,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    username: "Ted",
    image:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
    userId: "",
    comments: ["super", "kozak", "pozdro"],
    reactions: [1, 2, 3, 4, 5, 6],
  },
];

const friends = [
  {
    id: 1,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    id: 2,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    id: 3,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    id: 4,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    id: 5,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    id: 6,
    firstname: "Karina",
    lastname: "Mazur",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
];

const Friend = ({ id, firstname, lastname, img }) => {
  return (
    <Box key={id} sx={{ width: "100%", padding: "10px", margin: 0 }}>
      <CardContent>
        <img
          style={{ maxWidth: "100%", height: "140px", borderRadius: "20px" }}
          src={img}
          srcSet={`${img}`}
          alt={"elo"}
          loading="lazy"
        />
        <br />
        <Typography sx={{ textAlign: "center" }} component="div">
          {firstname} {lastname}
        </Typography>
      </CardContent>
    </Box>
  );
};
const MyFriends = () => {
  return (
    <Box sx={{ paddingBottom: "0px", paddingLeft: "0px" }}>
      <Typography
        sx={{
          fontSize: 30,
          display: "flex",
          fontWeight: "bold",
          paddingLeft: "0px",
        }}
        color="black"
      >
        Friends
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "grid",

          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {friends.map(({ id, firstname, lastname, img }) => (
          <Friend id={id} firstname={firstname} lastname={lastname} img={img} />
        ))}
      </Box>
    </Box>
  );
};
const MyPosts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
      }}
    >
      {posts.map(
        ({ id, description, username, image, comments, reactions }) => (
          <Post
            id={id}
            description={description}
            username={username}
            image={image}
            comments={comments}
            reactions={reactions}
          />
        )
      )}
    </Box>
  );
};
const Info = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ minWidth: 275, paddingTop: "30px" }}>
        <Button variant="contained" endIcon={<AddIcon />}>
          Follow
        </Button>
        <CardContent sx={{ paddingBottom: "0px", paddingLeft: "0px" }}>
          <Typography
            sx={{
              fontSize: 30,
              display: "flex",
              fontWeight: "bold",
            }}
            color="black"
          >
            User information
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            sx={{ fontSize: 14, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Typography sx={{ fontWeight: "bold" }}>City: </Typography>{" "}
            <Typography sx={{}}>Warszawa</Typography>
          </Typography>
          <Typography
            sx={{ fontSize: 14, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Typography sx={{ fontWeight: "bold" }}>Country: </Typography>{" "}
            <Typography sx={{}}>Poland</Typography>
          </Typography>
          <Typography
            sx={{ fontSize: 14, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Typography sx={{ fontWeight: "bold" }}>Relationship: </Typography>{" "}
            <Typography sx={{}}>single</Typography>
          </Typography>
        </CardContent>

        <CardContent>
          <MyFriends />
        </CardContent>
      </Box>
    </Box>
  );
};

const userProfile = () => {
  return (
    <div className="user_container">
      <React.Fragment>
        <Box
          sx={{
            paddingTop: "100px",
            width: "100%",
            maxWidth: "100%",

            height: 100,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <Avatar
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            sx={{
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              width: 100,
              height: 100,
            }}
          ></Avatar>
        </Box>

        <Typography
          sx={{
            fontSize: "30px",
            marginLeft: "auto",
            marginRight: "auto",
            flexGrow: 1,
            textAlign: "center",
            position: "relative",
            fontWeight: "bold",
          }}
        >
          Sebastian Mazur
        </Typography>
        <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
          <MyPosts />
          <Info />
        </Box>

        <Box sx={{ display: "flex", width: "100%" }}></Box>
      </React.Fragment>
    </div>
  );
};

export default userProfile;
