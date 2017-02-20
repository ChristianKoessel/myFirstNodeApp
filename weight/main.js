'use strict';

const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8080;

const app = express();
app.use(morgan('dev'));
app.use(serveStatic(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/weight', function (request, response) {
    var weightTable = {
        'date': new Date(),
        'weight': request.body.weight
    }
    fs.appendFile(__dirname + '/data/weight.json', JSON.stringify(weightTable));
    response.redirect('/');
});

app.listen(PORT);
console.log('Server running at http://localhost:' + PORT);