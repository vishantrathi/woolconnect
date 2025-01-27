const express=require('express');
const router=express.Router();
const db=require('../db');
const User=require('../models/User');
const bcrypt=require('bcrypt'); 
const {getToken}=require('../utils/helper');
router.post('/register',async(req,res)=>{
    const {name,surname,phoneNumber,email,country,state,password,termsAccepted}=req.body;
    const user=await User.findOne({email:email});
    if(user){
        return res.status(403).json({error:"User already exists"});
    }
    const hasedPassword=await bcrypt.hash(password,10);
    const newUserData=new User({
        email,
        password:hasedPassword,
        name,
        surname,
        phoneNumber,
        country,
        state,
        termsAccepted
    });
    const newUser=await User.create(newUserData);
    const token=await getToken(email,newUser);
    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});
router.post('/login',async(req,res)=>{
    const {password,email}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(403).json({error:"user does not exist please register"});
    }
    const issame=await bcrypt.compare(password,user.password);
    if(!issame){
        return res.status(403).json({error:"Invalid password"});
    }
    const token=await getToken(email,user);
    const userToReturn={...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})
module.exports=router;