'use strict'

function EmailValidator(email){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    return regex.test(email);
}

// testing 
// console.log(EmailValidator('anda@anda.com'));
// console.log(EmailValidator('andaanda.com'));
// console.log(EmailValidator('anda@andacom'));

module.exports = EmailValidator