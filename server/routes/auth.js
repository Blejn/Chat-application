const router = require("express").Router();
const User =require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req,res)=>{
    


  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

      const newUser=  new User({
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     username:req.body.username,
     email:req.body.email,
     password:hashedPassword,
  });
  
  const user = await newUser.save();
  res.status(200).json(user);
  } catch(err){
    console.log(err);
  }
  });
  //LOGIN
  router.post("/login", async(req,res)=>{
    try{
    const user = await User.findOne({ username: req?.body?.username });
    !user && res.status(404).json("user not found");



    const validPassword = await bcrypt.compare(req?.body?.password, user?.password)
   !validPassword && res.status(400).json("password not correct")



    res.status(200).json(user)
 
    }catch(err){
      res.status(500).json(err);
    }
  })



module.exports = router