const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
    ],    
    token:{
        type:String
    },
}, { timestamps :true}
);

module.exports =mongoose.model("User" ,userSchema);