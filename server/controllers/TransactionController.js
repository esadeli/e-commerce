'use strict'

const Transcation = require('../models/transaction');
const User = require('../models/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const ConvertToObjectId = require('../helpers/ConvertToObjectId');

class TranscationController {

    // create transaction
    static createTransaction(req,res){
        // console.log('DECODED-->',req.decoded);
        // console.log('req.body---->',req.body)
        let arrayTransaction = req.body['itemId']

        // convert array of string of ObjectId into real objectId

        Transcation.create({    
            userId : ObjectId(req.decoded.user_id),
            // itemId : ObjectId(req.body.itemId)
            itemLists : req.body['itemId'],
            amount : req.body['amount']
        })
        .then(row =>{

            // get this user data transaction
            User.findOne({_id : req.decoded.user_id})
                .then(row =>{
                    // console.log('INI DATA USER-->',row)
                    // console.log('ini array-->',arrayTransaction)

                    // convert your data first
                    // let newArr = ConvertToObjectId(arrayTransaction);
                    // console.log('new Array-->',newArr)

                    //update this user's data with bunch of transaction
                    User.findOneAndUpdate({_id : req.decoded.user_id},{
                        name : row.name,
                        username : row.username,
                        password : row.password,
                        email : row.email,
                        transactionsList : arrayTransaction
                    })
                        .then(row =>{
                            res.status(200).json({ msg : 'Transaction success'})
                        })
                        .catch(err =>{
                            res.status(500).json({ msg : err })
                        })

                })
                .catch(err =>{
                    res.status(500).json({ msg : err })
                })

            // res.status(200).json({ msg: 'Transaction success' });
        })
        .catch(err =>{
            res.status(500).json({ msg : err});
        })
    }

    // list of all transaction
    static getAllTransaction(req,res){
        Transcation.find({}).populate('itemsList')
            .then(rows =>{
                res.status(200).json({ 
                    msg : 'List of all transaction',
                    data : rows
                })
            })
            .catch(err =>{
                res.status(500).json({ msg : err});
            })
    }
}

module.exports = TranscationController