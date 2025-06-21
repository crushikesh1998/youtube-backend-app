import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    videoUrl:{
        type:String,
        required:true,
        trim:true
    },
    videoId:{
        type:String,
        required:true,
        trim:true
    },
    thumbnailUrl:{
        type:String,
        required:true,
        trim:true
    },
    thumbnailId:{
        type:String,
        required:true,
        
    },  
    category:{
        type:String,
        required:true,
        trim:true
    },
    tags:[
        {
            type:String,
            trim:true
        }
    ],
    likedBy:[{type: mongoose.Schema.Types.ObjectId ,ref:"User"}],
    dislikedBy:[{type: mongoose.Schema.Types.ObjectId ,ref:"User"}],
    viewedBy:[{type: mongoose.Schema.Types.ObjectId ,ref:"User"}],
},{timestamps:true})


//virtual field for likes,dislikes,view
videoSchema.virtual("likes").get(function(){
    return this.likedBy.length;
});
videoSchema.virtual("dislikes").get(function(){
    return this.dislikedBy.length;
});
videoSchema.virtual("views").get(function(){
    return this.viewedBy.length;
});

//ensure virtual field are include in JSON output
videoSchema.set("toJSON",{
    virtuals:true,
})
const Video = mongoose.model("Video",videoSchema)

export default Video;