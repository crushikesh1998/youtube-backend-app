import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
export const databaseConnection =async()=>{
    try {
        const dbconnection =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`db connected successfully :: DB HOST :: ${dbconnection.connection.host}`);
        
    } catch (error) {
        console.log('Database connection failed',error);
    }
}