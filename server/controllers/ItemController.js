'use strict'

const Item = require('../models/item');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class ItemController {

    // add new item
    static createItem(req,res){

        // create item
        Item.create({ 
            name : req.body.name, 
            price : req.body.price, 
            categoryInfo : [ObjectId(req.body.category_id)] })
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
            .then(rows =>{
                res.status(200).json({
                    msg : 'List of items',
                    data : rows
                })
            })  
            .catch(err =>{
                res.status(500).json({ msg : err});
            })  
    }

    // edit item
    static editItem(req,res){
        let editId = req.params.id;
        Item.findOneAndUpdate({_id : editId},{
            name : req.body.name, 
            price : req.body.price, 
            categoryInfo : ObjectId(req.body.category_id) 
        })
        .then(row => {
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