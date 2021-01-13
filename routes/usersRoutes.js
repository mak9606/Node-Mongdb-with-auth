import express from 'express';
import UserModel from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router=express.Router();

router.post('/register',async (req,res)=>{
    
   
    const emailExist=await UserModel.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("The email already exists");

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    const userReg=new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try {
        await userReg.save();
        res.status(200).json({user:userReg._id});
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});
router.post('/login',async (req,res)=>{
    const user=await UserModel.findOne({email:req.body.email});
    if(!user) return res.status(401).send("The email or password is invalid");
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) res.status(404).send("The email or password is invalid");

    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    res.send("user logged in!");
});

export default router;