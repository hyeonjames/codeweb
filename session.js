const {Account} = require('./routes/account.js');
const {Promise} = require( 'bluebird');
class Session
{
    constructor (req,accountNo,created) {
        req.session.sessionInstance = this;
        this.accountNo = accountNo;
    }
    static getInstance(req){
        return req.session.sessionInstance || null;
    }
    update(){
        return new Promise(function (resolve,reject){
            Account.findOne({
                acc_no : this.accountNo
            },function (err,row){
                if(err){
                    reject(err);
                }
                else if(!row){
                    reject(err);
                }
                else {
                    this.email = row.email;
                    this.level = row.level;
                    resolve(this);
                }
            });
        });
    }
}

module.exports = Session;