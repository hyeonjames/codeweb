'use strict';
const express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const mong = require('mongoose');
const app = express();
mong.connect('mongodb://localhost/codeweb');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('pub'));
const routes = {
    '/accounts' : './routes/account.js'
}

for(let route in routes){
    let url = routes[route];
    let exports = require(url);
    let Router = express.Router();
    exports(Router);
    app.use(route,Router);
}


app.listen(80);

