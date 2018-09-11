'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
const UserController = require('../controllers/UserController');

// User registration
router.post('/register',(req,res)=>{
    UserController.registerUser(req,res);
})

// User login
router.post('/login',(req,res)=>{
    UserController.loginUser(req,res);
})

// List of users 
// Note: in reality it should be given IsLogin and IsAdmin
// but in case of testing in Postman the middlewares are revoked
router.get('/lists',(req,res)=>{
    UserController.getAllUsers(req,res);
})

module.exports = router
