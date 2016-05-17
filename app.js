'use strict';
let process = require('process');
let express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const mong = require('mongoose');
const app = express();

console.log(process.cwd());
mong.connect('mongodb://localhost/codeweb', function (err) {
    app.listen(3000);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'codeweb',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('./pub'));
const routes = {
    '/api/accounts': './routes/account.js'
}

for (let route in routes) {
    let url = routes[route];
    let exports = require(url);
    let Router = express.Router();
    exports(Router, app);
    app.use(route, Router);
}


//    app.listen(80);