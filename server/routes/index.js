const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
//app.use(bodyParser.json());
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categoria'));

app.use(require('./producto'));

app.use(require('./upload'));
app.use(require('./imagenes'));


module.exports = app;