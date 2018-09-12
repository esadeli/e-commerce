'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    itemsList : [ String ],
    transaction_date : {
        type : Date,
        default : new Date()
    }
},{
    timestamps : true
})

const Transaction = mongoose.model('Transaction',TransactionSchema);

module.exports = Transaction