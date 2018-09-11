'use strict'

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// User registration
router.post('/register',(req,res)=>{
    UserController.registerUser(req,res);
})

// User login
router.post('/login',(req,res)=>{
    UserController.loginUser(req,res);
})

module.exports = router
