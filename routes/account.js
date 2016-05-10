'use strict';
const $m = require('mongoose');
const autoIncrement = require('mongoose-sequence')
const Session = require('../session.js');
const error = require('../error.js');
let {Email,Password} = require('../validate.js');
let AccountSchema = $m.Schema({
    email : Email,
    password : Password,
    level : {type : Number, default: 1},
    registDate : { type : Date, default : new Date()}
});

AccountSchema.plugin(autoIncrement,{inc_field : 'acc_no'});

const Account = $m.model('account',AccountSchema);

module.exports = (router) => {
    router.get('/', (req,res)=>{
        let ses = Session.getInstance(req);
        if(ses){
            res.send({
                email : ses.email,
                lv : ses.level
            });
        } else {
            res.send({
                email : 'guest',
                lv : 0
            });
        }
    });
    router.post('/join',(req,res)=>{
        let ses = Session.getInstance(req);
        if(ses){
            res.send(error('a02'));
        } else {
            Account.findOne({email : em},function (err,row){
                if(err){
                    res.send(error('db01'));
                } else {
                    if(!row){     
                        new Account({
                            email : req.body.email,
                            password : req.body.pw
                        }).save(function (err){
                            
                        });
                    } else {
                        
                    }
                }
            })
        }
    });
    router.post('/auth',(req,res)=>{
        let em = req.body.email;
        
    });
    
}
module.exports.Account = Account;