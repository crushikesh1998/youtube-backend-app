import  mongoose from 'mongoose';


const userSchama = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    channelName :{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
      
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    logoUrl:{
        type:String,
        required:true,
    },
    logoId:{
        type:String,
        required:true,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribeChannel:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},{timestamps:true})


const User  =mongoose.model("User",userSchama);

export default User;