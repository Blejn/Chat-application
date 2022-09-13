const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create post
router.post("/createpost",async(req,res)=>{
  
    try{
        const newPost = new Post(req.body);
        const post = await newPost.save();
        res.status(200).json(post);
    }catch(error){
          res.status(500).json(error);
    }

});

//Update Post
router.put("/:id",async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
       if(req.body.userId === post.userId){
         await post.updateOne({$set:req.body});
         
         res.status(200).json("user updated post")
       }else{
        res.status(403).json("Can't do that because its not your post")
       }
    }catch(error){
        return res.status(500).json(error);
    }
});
//Delete post
router.delete("/:id", async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
        if(req.body.userId=== post.userId){
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("post deleted!")
        }
        else{
            res.status(500).json("Can't delete not your post");
        }

    }catch(err){
        res.status(500).json("can't delete post")
    }
});
//like post and
//cancel reaction

router.put("/:id/reaction",async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id)
    if(!post.reactions.includes(req.body.userId)){
         await post.updateOne({$push:{reactions:req.body.userId}});
         res.status(200).json("You react to this post")
    }else{
          await post.updateOne({$pull:{reactions:req.body.userId}});
        res.status(200).json("You cancel react to this post")

    }
}catch(error){
    res.status(500).json(err);
}
});


//get a post

router.get("/:id", async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json(error);
    }
})
//all posts

router.get("/timeline/all", async (req,res)=>{
    let posts = [];
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser.id})

        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
               return  Post.find({userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts));

    }catch(error){
        res.status(500).json(error);
    }
})
module.exports=router;