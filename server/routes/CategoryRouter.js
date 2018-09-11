'use strict'

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// create new category
router.post('/add',(req,res)=>{
    CategoryController.createCategory(req,res);
})

// get lists of category
router.get('/lists',(req,res)=>{
    CategoryController.getAllCategory(req,res);
})

// get individual view of category
router.get('/view/:id',(req,res)=>{
    CategoryController.getCategoryByName(req,res);
})

// edit category
router.put('/edit/:id',(req,res)=>{
    CategoryController.editCategory(req,res);
})

// delete category
router.delete('/delete/:id',(req,res)=>{
    CategoryController.deleteCategory(req,res);
})

module.exports = router