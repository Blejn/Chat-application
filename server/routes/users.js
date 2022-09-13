const router = require("express").Router();
const bcrypt=require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

//GET
router.get("/",(req,res)=>{
    res.send("hey its user router");
})

//UPDATE
router.put("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
           if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err){
                return res.status(500).json(err)
            }
           }


           try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body});
                res.status(200).json("account updated");
            
            } catch(err){
                return res.status(500).json(err);
            }
    } else{
        res.status(403).json("You are not Admin")
    }
});

//DELETE
router.delete("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
           try{
            await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted");
            
            } catch(err){
                return res.status(500).json(err);
            }
    } else{
        res.status(403).json("Can't delete account")
    }
});





//GET ONE USER
router.get("/:id", async (req,res)=>{
    try{
   const user = await User.findById(req.params.id);
   const{password, updatedAt, ...other} = user._doc
    res.status(200).json(other);
    }
    catch(err){
     res.status(500).json(err)
    }
});



//FOLLOW USER
router.put("/:id/follow", async(req,res)=>{
if(req.body.userId !== req.params.id){
    try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
          await user.updateOne({$push:{followings: req.body.userId}});
          await currentUser.updateOne({$push:{followers: req.params.id}});
          res.status(200).json("Follow!")
        } else{
            res.status(403).json("You Allready follow this user")
        }

    }catch(err){
        res.status(500).json(err);
    }

} else{
    res.status(403).json("you can't follow yourself");
}
});

router.put("/:id/unfollow", async(req,res)=>{
if(req.body.userId !== req.params.id){
    try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(user.followings.includes(req.body.userId)){
          await user.updateOne({$pull:{followings: req.body.userId}});
          await currentUser.updateOne({$pull:{followers: req.params.id}});
          res.status(200).json("Unfollow!")
        } else{
            res.status(403).json("Allready unfollow this user")
        }

    }catch(err){
        res.status(500).json(err);
    }

} else{
    res.status(403).json("you can't follow yourself");
}
});
//Create post



module.exports = router