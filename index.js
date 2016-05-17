'use strict';
let express = require('express');

let app = express();
let cors = require('cors');
app.use(cors({
    origin : /\.code404\.co\.kr$/ig
}));
app.use(express.static('./pub'));

app.listen(3000);