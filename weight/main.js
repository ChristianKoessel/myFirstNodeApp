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
    var requestDate = new Date(request.body.date);
    var requestWeight = Number(request.body.weight).toPrecision(3);
    console.log("addWeight %s %s", requestDate, requestWeight);
    var data = getData();
    data.values = data.values.filter(function(element) {
        return (new Date(element.date).getTime() != requestDate.getTime());
    });
    data.values.push({
        'date': requestDate,
        'weight': requestWeight
    });
    fs.writeFile(__dirname + '/data/weight.json', JSON.stringify(data));
    response.redirect('/');
});

app.listen(PORT);
console.log('Server running at http://localhost:' + PORT);