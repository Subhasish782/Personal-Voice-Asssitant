import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cokkieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';

const app=express();
app.use(cors({
    origin:[
        "https://virtualassistant-hgvy.onrender.com",
        "http://localhost:5173"
         ],
    credentials:true,
}))
const PORT=process.env.PORT || 3000;

// app.get("/",(req,res)=> {
//     res.send("Hello from the backend!");
// })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cokkieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);


app.get("/",async (req,res)=> {
    let prompt=req.query.prompt;
    let data=await geminiResponse(prompt)
    res.json(data);
})
app.listen(PORT,()=> {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
