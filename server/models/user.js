'use strict'

const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String
    },
    username : {
        type : String,
        unique : 'Username should be unique'
    },
    password : {
        type : String   
    },
    email : {
        type : String,
        unique : 'Email should be unique'
    },
    role : {
        type : String,
        default : 'user'
    },
    transactionsList : [{
        type : Schema.Types.ObjectId,
        ref : 'Transaction'
    }]
},{
    timestamps : true
})

UserSchema.plugin(beautifyUnique);
const User = mongoose.model('User',UserSchema);

module.exports = User;