'use strict'

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function ConvertToObjectId(array) {
    
    let arrInput = array
    for(let i = 0; i< arrInput.length;i++){
        arrInput[i] = ObjectId(array[i])
    }

    return arrInput;
}

module.exports = ConvertToObjectId