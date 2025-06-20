import express from 'express';
import dotenv, { config } from 'dotenv';
const app = express();
dotenv.config();
const PORT =process.env.PORT || 3000;
//Global  middleware
app.use(express.json())



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})


