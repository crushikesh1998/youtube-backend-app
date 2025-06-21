import mongoose from "mongoose";
import User from "./user.models";

const videoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id:[{
        
    }]

},{timestamps:true})

const Video = mongoose.model("Video",videoSchema)