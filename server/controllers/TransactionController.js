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
        // let arrayTransaction = req.body['itemId']

        // convert array of string of ObjectId into real objectId

        Transcation.create({    
            userId : ObjectId(req.decoded.user_id),
            // itemId : ObjectId(req.body.itemId)
            itemLists : req.body['itemId']
        })
        .then(row =>{

            // get this user data transaction
            User.findOne({_id : req.decoded.user_id})
                .then(user =>{
                    let dataUser = user // get data user for update purposes
                    console.log('INI DATA USER-->',dataUser)
                    // console.log('ini array-->',arrayTransaction)

                    // convert your data first
                    // let newArr = ConvertToObjectId(arrayTransaction);
                    // console.log('new Array-->',newArr)
                    Transcation.find({ userId : dataUser._id})
                        .sort('-createdAt').limit(1)
                        .then(transaction=>{    
                            let latestTransaction = transaction[0]._id // latest transaction id
                            //console.log(row)
                            console.log('Hasil Transaction -->',latestTransaction)

                            // update user data
                                dataUser.update(
                                    { $push : { transactionsList : latestTransaction }})
                                    .then(row =>{
                                        // console.log('SUKSES----->')
                                        res.status(200).json({ msg : 'Update User success'})
                                    })
                                    .catch(err =>{
                                        res.status(500).json({ msg : err })
                                    })

                        })
                        .catch(err =>{
                            // console.log(err, 'woiiii')
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