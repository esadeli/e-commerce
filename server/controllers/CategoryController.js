'use strict'

const Category = require('../models/category');

class CategoryController {

    // create category
    static createCategory(req,res){
        Category.create({
            name : req.body.name
        })
        .then(row =>{
            res.status(200).json({ msg : 'Category has been created'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err });
        })
    }

    // get all lists of category
    // get category by name
    static getAllCategory(req,res){
        Category.find({}).populate('groupItem')
            .then(rows =>{
                res.status(200).json({ 
                    msg : 'List of categories',
                    data : rows
                })
            })
            .catch(err =>{
                res.status(500).json({
                    msg : err
                })
            })
    }

    // get category by name
    static getCategoryByName(req,res){
        Category.findOne({
            name : req.body.name
        }).populate('groupItem')
            .then(row =>{
                res.status(200).json({ 
                    msg : 'Category found!',
                    data : row
                })
            })
            .catch(err =>{
                res.status(500).json({
                    msg : err
                })
            })
    }

    // edit category
    static editCategory(req,res){

        // console.log('CATEGORY-->',req.body['groupItem'])
        Category.findOneAndUpdate({_id : req.params.id},{
            name : req.body.name,
            groupItem : req.body['groupItem']
        })
        .then(row =>{
            res.status(200).json({ msg : 'Category has been updated'});
        })
        .catch(err =>{
            res.status(500).json({ msg : err});
        })
    }

    // delete category
    static deleteCategory(req,res){
        Category.deleteOne({ _id : req.params.id})
            .then(row =>{
                res.status(200).json({ msg : 'Category has been deleted'});
            })
            .catch(err =>{
                res.status(500).json({ msg : err})
            })
    }
}

module.exports = CategoryController