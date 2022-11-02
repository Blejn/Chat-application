import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import axios from "axios";
import Post from "../post/Post";
import Share from "../post/Share";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import SwitchBanner from "../post/SwitchBanner";
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [text, setText] = useState("");
  const [feedFriends, setFeedFriends] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [posts, user._id]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      var res = await axios.get(
        "http://localhost:3500/api/posts/allPosts/list"
      );
      setAllPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchAllPosts();
  }, [allPosts]);
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="feed_container">
        <div style={{ position: "relative", textAlign: "center" }}>
          <Share />
          <SwitchBanner setFeedFriends={setFeedFriends} />
        </div>
        {feedFriends
          ? posts.map(
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
            )
          : allPosts.map(
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
