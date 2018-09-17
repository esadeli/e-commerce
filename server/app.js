'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eBelanja',{ useNewUrlParser: true });
// mongoose.connect(process.env.MONGO_USER, { useNewUrlParser : true});



app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use(cors());

//----> Define your routes here
const UserRouter = require('./routes/UserRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const ItemRouter = require('./routes/ItemRouter');
const TransactionRouter = require('./routes/TransactionRouter');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected ebelanja db!`);
});

//----> Call your routes here
app.use('/users',UserRouter);
app.use('/categories',CategoryRouter);
app.use('/items',ItemRouter);
app.use('/transactions',TransactionRouter);

app.get('/',(req,res)=>{
    console.log('Base set up OK')
    res.send('OK')// penyebab error mlab jika tidak dipasang
});

// app.listen(process.env.PORT || 3000, ()=> { 
//     console.log('You are listening to PORT')
// });
app.listen(3000, ()=>{
    console.log('You are listening to PORT 3000')
})