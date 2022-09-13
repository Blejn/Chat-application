import React from "react";
import "./feed.css";
import Post from "../post/Post";
import Share from "../post/Share";
const Feed = () => {
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

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="feed_container">
        <Share />
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
      </div>
    </div>
  );
};

export default Feed;
