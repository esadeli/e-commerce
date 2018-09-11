'use strict'

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const IsLogin = require('../middlewares/IsLogin');
const IsAdmin = require('../middlewares/IsAdmin');
// router.use(IsAdmin);


// get lists of items
router.get('/lists',(req,res)=>{
    ItemController.getListItems(req,res);
})

// add new items
router.post('/add',IsLogin,IsAdmin,(req,res)=>{
    ItemController.createItem(req,res);
})

// edit item
router.put('/edit/:id',IsLogin,IsAdmin,(req,res)=>{
    ItemController.editItem(req,res);
})

// delete item
router.delete('/delete/:id',IsLogin,IsAdmin,(req,res)=>{
    ItemController.deleteItem(req,res);
})

module.exports = router