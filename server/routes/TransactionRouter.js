'use strict'

const express = require('express');
const router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
const TransactionController = require('../controllers/TransactionController');

// create individual transaction 
router.post('/add',IsLogin,(req,res)=>{ 
    TransactionController.createTransaction(req,res);
});

// get list of all transaction
router.get('/lists',IsLogin,(req,res)=>{
    TransactionController.getAllTransaction(req,res);
})

module.exports = router