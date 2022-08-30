const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{
     type:String,
     required:true,

    },
    lastname:{
     type:String,
     required:true,
     
    },
    username:{
        type: String,
        required: true,
        min:3,
        max:15,
        unique:true
    },
    email:{
        type:String,
        required:true,
         max:50,
         unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
        
    
    },
    avatar:{
        type:String,
        default:""
    },
    coverAvatar:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followed:{
     type:Array,
     default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},
{timestamps:true});


module.exports = mongoose.model("User",UserSchema);