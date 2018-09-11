'use strict'

const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

// get lists of items
router.get('/lists',(req,res)=>{
    ItemController.getListItems(req,res);
})

// add new items
router.post('/add',(req,res)=>{
    ItemController.createItem(req,res);
})

// edit item
router.put('/edit/:id',(req,res)=>{
    ItemController.editItem(req,res);
})

// delete item
router.delete('/delete/:id',(req,res)=>{
    ItemController.deleteItem(req,res);
})

module.exports = router