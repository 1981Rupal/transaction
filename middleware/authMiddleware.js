const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req,res,next) =>{

    len token =req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message:'Not Authorized'});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select('-passwordHash');
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token'});
    }
};

module.exports = protect;