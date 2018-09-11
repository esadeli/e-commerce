'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name :{
        type : String
    },
    price : {
        type : Number
    }, 
    categoryInfo : {type : Schema.Types.ObjectId,ref : 'Category'}
},{
    timestamps : true
})

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item