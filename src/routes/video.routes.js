import mongoose from 'mongoose';
import express from 'express';

import User from '../models/user.models.js';
import Video from '../models/video.models.js';
import cloudinary from '../config/cloudinary.config.js'
import { checkAuth } from '../middleware/auth.middleware.js';

const router =express.Router();

//upload video
router.post("/upload",checkAuth,async(req,res)=>{
    console.log("upload hitted")
    try {
        const{title,description,category,tags} =req.body;
        if(!req.files || !req.files.video || !req.files.thumbnail){
            return res.status(400).json({ error: "videos and thumnail are required", message: error.message })
        }

        const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath,{
            resource_type:"video",
            folder:"videos"
        });
        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
            folder:"thumbnails"
        });

        const newVideo =new Video({
            _id:mongoose.Schema.Types.ObjectId,
            title,
            description,
            user_id:req.user._id,
            videoUrl:videoUpload.secure_url,
            videoId:videoUpload.public_id,
            thumbnailUrl:thumbnailUpload.secure_url,
            thumbnailId:thumbnailUpload.public_id,
            category,
            tags:tags ? tags.split(",") :[]
        })

        await newVideo.save()
        res.status(201).json({message:"video upload successfully",video:newVideo})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong", message: error.message })
    }
})


export default router;