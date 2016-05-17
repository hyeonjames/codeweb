'use strict';
let express = require('express');

let app = express();
let cors = require('cors');
app.use((req,res)=>{
    res.header('Access-Control-Allow-Origin','*.code404.co.kr');
    res.header('Access-Control-Request-Method','GET, POST, PUT, DELETE')
});
app.use(express.static('./pub'));

app.listen(3000);