'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eBelanja',{ useNewUrlParser: true });


app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use(cors());

//----> Define your routes here
const UserRouter = require('./routes/UserRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const ItemRouter = require('./routes/ItemRouter');
const TransactionRouter = require('./routes/TransactionRouter');

//----> Call your routes here
app.use('/users',UserRouter);
app.use('/categories',CategoryRouter);
app.use('/items',ItemRouter);
app.use('/transactions',TransactionRouter);

app.get('/',(req,res)=>{
    console.log('Base set up OK')
});

app.listen(3000, ()=> { 
    console.log('You are listening to PORT 3000')
});