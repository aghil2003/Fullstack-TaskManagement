import express from "express";
import dotenv from 'dotenv';
import Route from "./routes/authRoutr.js";
import connectDB from "./configue/db.js";
import cors from 'cors';



const app=express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

app.use(cors({origin:process.env.FROENTENDURL}));
const PORT=process.env.PORT||5000

app.use("/",Route)
dotenv.config();
connectDB();
app.listen(PORT,()=>{
    console.log(`the server is runing on port ${PORT} `);
    
})