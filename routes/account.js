'use strict';
const $m = require('mongoose');
const autoIncrement = require('mongoose-sequence')
let {Email,Password} = require('../validate.js');
let AccountSchema = $m.Schema({
    email : Email,
    password : Password
});
AccountSchema.plugin(autoIncrement,{inc_field : 'acc_no'});

const Account = $m.model('account',AccountSchema);

module.exports = (router) => {
    router.get('/', (req,res)=>{
        
    });
    
}