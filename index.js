import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/usersRoutes.js';
import postRoutes from './routes/post.js';

dotenv.config();
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
app.get('/',(req,res)=>{
    res.send("Welcome to backend..");
});

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true});

const PORT=process.env.PORT || 5000 ;

app.listen(PORT,()=>console.log(`The server started at http://localhost:${PORT}`));

mongoose.set('useFindAndModify',false);