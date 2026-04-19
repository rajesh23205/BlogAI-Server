import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from "./config/db.js";

dotenv.config();

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DB Connected');
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))
}).catch(err=> console.log(err));