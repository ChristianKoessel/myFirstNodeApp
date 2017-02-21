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

var getData = function() {
    return JSON.parse(fs.readFileSync(__dirname + '/data/weight.json'));
};

app.get('/weight', function (request, response) {
    response.json(getData());
});

app.post('/weight', function (request, response) {
    var data = getData();
    var requestDate = new Date(request.body.date);
    //todo: bei gleichem Datum überschreiben
    data.values.push({
        'date': new Date(request.body.date),
        'weight': request.body.weight
    });
    fs.writeFile(__dirname + '/data/weight.json', JSON.stringify(data));
    response.redirect('/');
});

app.listen(PORT);
console.log('Server running at http://localhost:' + PORT);