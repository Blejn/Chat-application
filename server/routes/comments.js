const router = require("express").Router();
const Comment = require("../models/Comment");

//CREATE NEW COMMENT
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const addComment = await newComment.save();
    res.status(200).json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
