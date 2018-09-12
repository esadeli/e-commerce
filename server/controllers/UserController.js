'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const HashPassword = require('../helpers/HashPassword');
const EmailValidator = require('../helpers/EmailValidator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class UserController {

    // register users
    static registerUser(req,res){
        let hash = HashPassword(req.body.password);
        
        // check email first
        if(EmailValidator(req.body.email)){
            // create user
            User.create({
                name : req.body.name,
                username : req.body.username,
                password : hash,
                email : req.body.email,
                role : req.body.role
            })
            .then(row =>{
                
                // get back user's information
                User.findOne({ email: req.body.email, password : hash })
                    .then( row =>{
                          
                        // if exists get jwt token
                        jwt.sign({
                            user_id : row._id,
                            name : row.name,
                            email : row.email,
                            role : row.role

                        },process.env.SECRETTOKEN,(error,token)=>{
                            if(error){
                                res.status(401).json({ msg : 'Invalid jwt token, You are not authorized' })
                            }else{
                                res.status(200).json({ 
                                    msg : 'Registration success',
                                    token : token
                                })
                            }
                        })
                    })
                    .catch (err =>{
                        res.status(500).json({ msg : err});
                    })
            })
            .catch(err =>{
                res.status(500).json({ msg : err});
            })
        }else{
            res.status(400).json({
                msg : 'Invalid Email'
            })
        }
    }

    // user login
    static loginUser(req,res){

        let hash = HashPassword(req.body.password)

        //check if users exist
        // get back user's information
        User.findOne({ email: req.body.email, password : hash })
        .then( row =>{
              
            // if exists get jwt token
            jwt.sign({
                user_id : row._id,
                name : row.name,
                email : row.email,
                role : row.role

            },process.env.SECRETTOKEN,(error,token)=>{
                if(error){
                    res.status(401).json({ msg : 'Invalid email or password' })
                }else{
                    res.status(200).json({ 
                        msg : 'Login success',
                        token : token
                    })
                }
            })
        })
        .catch (err =>{
            res.status(500).json({ msg : err});
        })
    }

    // get all users
    static getAllUsers(req,res){
        User.find({}).populate('transactionsList')
            .then(rows=>{
                
                res.status(200).json({
                    msg : 'List of users',
                    data : rows
                })
            })
            .catch(err =>{
                res.status(500).json({ msg : err})
            })
    }
}

module.exports = UserController