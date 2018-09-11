'use strict'

function IsAdmin(req,res,next) {
    // token check
    if(req.decoded.role === 'admin'){
        
        next();
    }else{
        res.status(403).json({ msg : 'You don\'t have admin authorization' })
    }
}

module.exports = IsAdmin