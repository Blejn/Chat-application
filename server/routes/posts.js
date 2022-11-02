const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { default: mongoose } = require("mongoose");
//Create post
router.post("/createpost", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (req.body.userId === post.userId) {
      await post.updateOne({ $set: req.body });

      res.status(200).json("user updated post");
    } else {
      res.status(403).json("Can't do that because its not your post");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
//Delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (req.body.userId === post.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("post deleted!");
    } else {
      res.status(500).json("Can't delete not your post");
    }
  } catch (err) {
    res.status(500).json("can't delete post");
  }
});
//like post and
//cancel reaction

router.put("/:id/reaction", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.reactions.includes(req.body.userId)) {
      await post.updateOne({ $push: { reactions: req.body.userId } });
      res.status(200).json("You react to this post");
    } else {
      await post.updateOne({ $pull: { reactions: req.body.userId } });
      res.status(200).json("You cancel react to this post");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

//PUT COMMENT TO POST
router.put("/:id/comment", async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const comment = await newComment.save();
    const post = await Post.findById(req.params.id);
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("You comments this post" + comment);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:userId/:id", async (req, res) => {
  const post = await Post.findById(req.body.postId);
  // const comment = post.comments.find(
  //   comment => comment._id === mongoose.Types.ObjectId(req.params.id)
  // );
  const comment = post.comments.map(comment => comment._id);
  const element = comment.map(el => el === req.params.id.toString());
  try {
    if ((req.body.userId = req.params.userId || comment)) {
      // await post.updateOne({
      //   $pull: {
      //     comments: { _id: comment },
      //   },
      // });
      await post.comments.findOneAndDelete({});
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json(element);
    } else {
      res.status(403).json("You are not owner of this comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//all posts from user

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser.id });

    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

//all user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// all posts
router.get("/allPosts/list", async (req, res) => {
  try {
    Post.find({}).then(function (posts) {
      res.status(200).json(posts);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports=router;