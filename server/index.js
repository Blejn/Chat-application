const express =require("express");
const app =express();
const mongoose= require("mongoose");
const dotenv=require("dotenv")
const helmet = require("helmet");
const morgan=require("morgan");
const userRoute = require("./routes/users");
 const authRoute = require("./routes/auth");
const { options } = require("./routes/users");
dotenv.config();


//CONNECT DO MONGO
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,
    useUnifiedTopology: true},()=>{
    console.log("Conntected to MongoDB");
});


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);




//APP LISTEN
app.listen(3500,()=>{
    console.log("SERVER RUNNING!");
})


