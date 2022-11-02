import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { axiosInstance } from "../../config";
import { useState } from "react";
export const Comment = ({ comment }) => {
  const [commentUser, setCommentUser] = useState({});
  useEffect(() => {
    const fetchCommentUser = async () => {
      try {
        const res = await axiosInstance.get("/users?userId=" + comment.userId);
        setCommentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommentUser();
  }, [comment.userId]);
  const PF = process.env.REACT_APP_ASSETS_FOLDER;
  return (
    <div
      style={{
        position: "relative",
        verticalAlign: "botttom",
        display: "flex",
        padding: "10px",
      }}
      key={comment._id}
    >
      <Avatar
        sx={{ marginRight: "10px" }}
        crossorigin
        src={PF + commentUser.avatar}
      />
      <div style={{ marginTop: "12px", verticalAlign: "bottom" }}>
        {comment.text}
      </div>
    </div>
  );
};
