'use strict'

const Item = require('../models/item');
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId; not used in mongoose, objectId automatically convert
const Category = require('../models/category')

class ItemController {

    // add new item
    static createItem(req,res){

        // create item
        Item.create({ 
            name : req.body.name, 
            price : req.body.price, 
            categoryInfo : req.body.category_id })
            .then(row =>{
                res.status(200).json({ 
                    msg : 'Item has been created'
                })
            })
            .catch(err =>{
                res.status(500).json({ msg : err});
            })
    }

    // get lists of item
    static getListItems(req,res){
        Item.find({})
            .then(items =>{

                // get all list category
                Category.find({})
                    .then(categories =>{
                        res.status(200).json({
                            msg : 'List of all items and categories',
                            items : items,
                            categories : categories
                        })
                    })
                    .catch(error =>{
                        res.status(500).json({ msg : err })
                    })
            })  
            .catch(err =>{
                res.status(500).json({ msg : err});
            })  
    }

    // edit item
    static editItem(req,res){
        let editId = req.params.id;
        // console.log('REQ BODY-->',req.body)
        Item.findOneAndUpdate({_id : editId},{
            name : req.body.name, 
            price : req.body.price,
            categoryInfo : req.body.categoryInfo 
        })
        .then(row => {
            // console.log('TEST-->',row)
            res.status(200).json({ msg : 'Item has been updated'})
        })
        .catch(err =>{
            res.status(500).json({ msg : err})
        })
    }

    // delete item
    static deleteItem(req,res){
        let deleteId = req.params.id;
        Item.deleteOne({_id : deleteId})
            .then(row =>{
                res.status(200).json({ msg : 'Item has been deleted'})
            })
            .catch(err =>{
                res.status(500).json({ msg : err})
            })            
    }
}

module.exports = ItemController