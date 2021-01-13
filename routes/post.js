import express from 'express';
import auth from '../verifyToken.js';

const router=express.Router();
  
router.get('/',auth,(req,res)=>
{
    res.send(req.user);
});

export default router;