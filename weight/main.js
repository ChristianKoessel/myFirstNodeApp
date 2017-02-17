'use strict';

const express = require("express");
const morgan = require("morgan");
const serveStatic = require("serve-static");

const PORT = 8080;

const app = express();
app.use(morgan('dev'));
app.use(serveStatic(__dirname + '/public'));

app.get('/', function (request, response) {
    response.send('Hello World\n');
});
app.listen(PORT);

console.log('Server running at http://localhost:' + PORT);