const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);
