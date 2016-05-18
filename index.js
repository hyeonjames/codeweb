'use strict';
let express = require('express');

let app = express();

app.use(express.static('./pub'));

app.listen(3000);