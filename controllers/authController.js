const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async(req,res) =>{
    const{username,email,password} = req.body;
    const existing =await User.findOne({email});
    if(existing) return res.status(400).json({message:'User already exists'});

    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({username , email,passwordHash:hashed});
    res.status(201).json({token:generateToken(user._id)});

};

exports.login = async(req,res)=>{
    const{email,password}=req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.passwordHash))){
        return res.status(401).json({message:'Invalid credentials'});
    }
    res.json({token:generateToken(user._id)});
};