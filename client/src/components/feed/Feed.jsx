import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Post from "../post/Post";
import Share from "../post/Share";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const Feed = ({ username }) => {
  // const posts = [
  //   {
  //     id: 1,
  //     description:
  //       "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  //     username: "Ted",
  //     image:
  //       "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512",
  //     userId: "",
  //     comments: ["super", "kozak", "pozdro"],
  //     reactions: [1, 2, 3, 4],
  //   },
  // ];

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user._id]);
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="feed_container">
        <Share />
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
      </div>
    </div>
  );
};

export default Feed;
