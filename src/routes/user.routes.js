import { Router } from "express";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from "../models/user.models.js";
import cloudinary from "../config/cloudinary.config.js";

const router = Router();
//signup
router.post("/signup", async (req, res) => {
    try {
        
        if (!req.files || !req.files.logoUrl) {
            return res.status(400).json({ error: "Logo file is required" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //console.log(hashedPassword)
        const uploadImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        );

        const newUser = new User({
            _id: new mongoose.Types.ObjectId,
            channelName: req.body.channelName,
            email: req.body.email,
            password: hashedPassword    ,
            phone: req.body.phone,
            logoUrl: uploadImage.secure_url,
            logoId: uploadImage.public_id
        })

        let user = await newUser.save();

        res.status(201).json({user});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong", message: error.message })
    }
})
//login
router.post("/login", async(req, res) => {
    try {
        const existingUser= await User.findOne({email:req.body.email});
        if(!existingUser){ 
            return res.status(404).json({message:"user not found"});
        }
        
        const isValid =await bcrypt.compare(
            req.body.password,
            existingUser.password
        )

        if(!isValid) {
            return res.status(500).json({message:"Invalid credentials"})
        }
        const token =  jwt.sign({
            _id:existingUser._id,
            channelName:existingUser.channelName,
            email:existingUser.email,
            phone:existingUser.phone,
            logoId:existingUser.logoId
        },process.env.JWT_TOKEN,{expiresIn:"10d"});

        res.status(200).json({
            _id:existingUser._id,
            channelName:existingUser.channelName,
            email:existingUser.email,
            phone:existingUser.phone,
            logoId:existingUser.logoId,
            logoUrl:existingUser.logoUrl,
            token:token,
            subscribers:existingUser.subscribers,
            subscribeChannel:existingUser.subscribeChannel
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong", message: error.message })
    }
})
export default router;