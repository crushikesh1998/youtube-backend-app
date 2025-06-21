import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';


import { databaseConnection } from './config/db.config.js';
import userRoute from './routes/user.routes.js';
import videoRoute from './routes/video.routes.js';

const app = express();
dotenv.config();

//database connection::
databaseConnection()

const PORT =process.env.PORT || 3000;

//Global  middleware
app.use(express.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))

//routers
app.use("/api/v1/user",userRoute);
app.use("api/v1/video",videoRoute)
    
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})


