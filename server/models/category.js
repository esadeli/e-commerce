'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name : {
        type : String
    },
    groupItem : [{ type : Schema.Types.ObjectId, ref : 'Item'}]
},{
    timestamps : true
})

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category
