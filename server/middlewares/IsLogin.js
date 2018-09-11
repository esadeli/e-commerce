'use strict'

const jwt = require('jsonwebtoken');
const User = require('../models/user');

function IsLogin(req,res,next) {
    
    // check if token exists
    if(req.headers.token){

        // verify token
        jwt.verify(req.headers.token,process.env.SECRETTOKEN,(error,decoded)=>{
            if(error){
                res.status(403).json({ msg : 'Invalid jwt token' });
            }else{

                User.findOne({ _id : decoded.id, email : decoded.email })
                    .then(row =>{
                        if(row){
                            next();

                        }else if(row ===null){
                            res.status(403).json({ msg : 'You are not authorized' });
                        }
                    })
                    .catch(err =>{
                        res.status(500).json({ msg : err });
                    })
            }
        })
    }else{
        res.status(403).json({ msg : 'You are not authorized' });
    }
}

module.exports = IsLogin
