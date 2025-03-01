import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB=()=>{
    mongoose.connect(process.env.URL,{    
    }).then(()=>{
        console.log("connected to mongodb"); 
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

export default connectDB;