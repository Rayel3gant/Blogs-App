const mongoose =require("mongoose");

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    tags:{
        type:[String],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments: {
        type: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            comment: { type: String, required: true },
        }],
        default: [],
    },
    likes: {
        type: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        }],
        default: [],
    },
    
}, { timestamps :true}
);

module.exports =mongoose.model("Blog" ,blogSchema);