'use strict'

const Transcation = require('../models/transaction');
const User = require('../models/user');
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId
// const ConvertToObjectId = require('../helpers/ConvertToObjectId');

class TranscationController {

    // create transaction
    static createTransaction(req,res){

        // convert array of string of ObjectId into real objectId

        Transcation.create({    
            userId : req.decoded.user_id,
            itemLists : req.body['itemId']
        })
        .then(row =>{
            // console.log('ROW-->',row)
            // get this user data transaction
            User.findOne({_id : req.decoded.user_id})
                .then(user =>{
                    let dataUser = user // get data user for update purposes

                    // convert your data first
                    Transcation.find({ userId : dataUser._id})
                        .sort('-createdAt').limit(1)
                        .then(transaction=>{    
                            let latestTransaction = transaction[0]._id // latest transaction id

                            // update user data
                                dataUser.update(
                                    { $push : { transactionsList : latestTransaction }})
                                    .then(row =>{
                                        res.status(200).json({ msg : 'Update User success'})
                                    })
                                    .catch(err =>{
                                        res.status(500).json({ msg : 'ERROR: ',err })
                                    })

                        })
                        .catch(err =>{
                            // console.log(err, 'woiiii')
                            res.status(500).json({ msg : 'ERROR: ',err })
                        })                    
                })
                .catch(err =>{
                    res.status(500).json({ msg : 'ERROR: ',err })
                })

            // res.status(200).json({ msg: 'Transaction success' });
        })
        .catch(err =>{
            res.status(500).json({ msg : 'ERROR: ',err});
        })
    }

    // list of all transactions
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