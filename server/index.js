const express =require("express");
const app =express();
const mongoose= require("mongoose");
const dotenv=require("dotenv")
const helmet = require("helmet");
const morgan=require("morgan");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts")
 const authRoute = require("./routes/auth");
 const conversationRoute = require("./routes/conversations");
 const commentRoute = require("./routes/comments");
 const messageRoute = require("./routes/messages");
 const cors = require("cors");
 const multer = require("multer");
 const path = require("path");
 dotenv.config();

 //CONNECT DO MONGO
 mongoose.connect(
   process.env.MONGO_URL,
   { useNewUrlParser: true, useUnifiedTopology: true },
   () => {
     console.log("Conntected to MongoDB");
   }
 );

 //Middleware
 app.use(express.json());
 app.use(cors());
 app.use(helmet());
 app.use(function (req, res, next) {
   res.setHeader("Cross-Origin-Resource-Policy", "same-site");
   next();
 });

 app.use("/api/users", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/posts", postRoute);
 app.use("/api/comments", commentRoute);
 app.use("/api/conversations", conversationRoute);
 app.use("/api/messages", messageRoute);
 app.use(morgan("common"));
 app.use("/images", express.static(path.join(__dirname, "public/images")));

 //MULTER TO UPLOAD FILES
 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "public/images");
   },
   filename: (req, file, cb) => {
     cb(null, req.body.name);
   },
 });
 const upload = multer({ storage });
 app.post("/api/upload", upload.single("file"), (req, res) => {
   try {
     return res.status(200).json("File upload succesfully");
   } catch (error) {
     res.status(500).json(error);
   }
 });

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});


//APP LISTEN
app.listen(process.env.PORT||3500,()=>{
    console.log("SERVER RUNNING!");
})


