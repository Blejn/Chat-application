import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import "./userProfile.css";
import Typography from "@mui/material/Typography";
import Post from "../post/Post";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// {
//   id: 6,
//   firstname: "Karina",
//   lastname: "Mazur",
//   img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
// },

// FRIEND PROFILE -------------------------------------
const Friend = ({ id, username, img }) => {
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  return (
    <Box
      key={id}
      sx={{
        width: "100%",
        padding: "10px",
        margin: 0,
        maxWidth: "100px",
        textAlign: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Link to={`/profile/${username}`}>
          <Avatar crossorigin src={PF + img} />
        </Link>
        <br />
        <Typography sx={{ textAlign: "center" }} component="div">
          {username}
        </Typography>
      </CardContent>
    </Box>
  );
};
// FRIENDS PROFILE -------------------------------------

const MyFriends = ({ id }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`/users/followings/` + id);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriends();
    console.log(friends);
  }, [friends, id]);

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
        {friends.map(({ _id, username, avatar }) => (
          <Friend id={_id} username={username} img={avatar} />
        ))}
      </Box>
    </Box>
  );
};
// USER POST PROFILE -------------------------------------

const MyPosts = ({ posts }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
      }}
    >
      {posts.map(
        ({
          _id,
          userId,
          description,
          image,
          comments,
          reactions,
          createdAt,
        }) => (
          <Post
            id={_id}
            userId={userId}
            description={description}
            image={image}
            createdAt={createdAt}
            comments={comments}
            reactions={reactions}
          />
        )
      )}
    </Box>
  );
};
// Info PROFILE -------------------------------------

const Info = ({
  currentUser,
  username,
  id,
  city,
  country,
  relationship,
  followers,
}) => {
  const [isFollowing, setIsFollowing] = useState(
    currentUser.followings.includes(id)
  );
  const followUser = async () => {
    try {
      !isFollowing
        ? await axios.put("/users/" + id + "/follow", {
            userId: currentUser._id,
          })
        : await axios.put("/users/" + id + "/unfollow", {
            userId: currentUser._id,
          });
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(!isFollowing);
  };
  useEffect(() => {
    setIsFollowing(currentUser.followings.includes(id));
  }, [currentUser.followings, id]);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ minWidth: 275, paddingTop: "30px" }}>
        {currentUser.username !== username ? (
          <Button
            variant="contained"
            color={isFollowing ? "error" : "primary"}
            endIcon={<AddIcon />}
            onClick={followUser}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        ) : (
          <div></div>
        )}
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
            <Typography sx={{ fontWeight: "bold" }}>City:</Typography>{" "}
            <Typography sx={{}}>{city}</Typography>
          </Typography>
          <Typography
            sx={{ fontSize: 14, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Typography sx={{ fontWeight: "bold" }}>Country: </Typography>{" "}
            <Typography sx={{}}>{country}</Typography>
          </Typography>
          <Typography
            sx={{ fontSize: 14, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Typography sx={{ fontWeight: "bold" }}>Relationship: </Typography>{" "}
            <Typography sx={{}}>{relationship}</Typography>
          </Typography>
        </CardContent>

        <CardContent>
          <MyFriends id={id} />
        </CardContent>
      </Box>
    </Box>
  );
};

// USER PROFILE -------------------------------------
const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  const username = useParams().username;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);

      setUser(res.data);
    };
    fetchUser();
  }, [posts, username]);

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
            backgroundImage: `url(${PF + user.coverAvatar})`,
            backgroundSize: "cover",
          }}
        >
          <Avatar
            src={PF + user.avatar}
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
          {user.firstname}
          <span> </span>
          {user.lastname}
        </Typography>
        <Box sx={{ display: "flex", width: "100%", gap: "10px" }}>
          <MyPosts posts={posts} />
          <Info
            currentUser={currentUser}
            username={username}
            id={user._id}
            city={user.city}
            country={user.country}
            relationship={user.relationship}
            followers={user.followers}
          />
        </Box>

        <Box sx={{ display: "flex", width: "100%" }}></Box>
      </React.Fragment>
    </div>
  );
};

export default UserProfile;
