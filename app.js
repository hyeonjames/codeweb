'use strict';

module.exports = (app,express)=>{
    const session = require('express-session');
    const bodyParser = require('body-parser');
    const mong = require('mongoose');

    let {Account} = require('./routes/account.js');
    mong.connect('mongodb://localhost/codeweb',function (err){
        
    });
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.use(session({
        secret : 'codeweb',
        resave : false,
        saveUninitialized : true
    }))
    app.use(express.static('./codeweb/pub'));
    const routes = {
        '/api/accounts' : './routes/account.js'
    }

    for(let route in routes){
        let url = routes[route];
        let exports = require(url);
        let Router = express.Router();
        exports(Router,app);
        app.use(route,Router);
    }


//    app.listen(80);
}