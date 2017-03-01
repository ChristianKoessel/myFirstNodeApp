'use strict';

const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(morgan('dev'));
app.use(serveStatic(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();

// Weight-API
const weightApi = require('./model/weight.js');
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });   
});
router.route('/weight')
.post(function (request, response) {
    weightApi.default.add(request.body);
    response.redirect('/');
})
.get(function (request, response) {
    response.send(weightApi.default.getAll());
})
.delete(function(request, response) {
    response.send(weightApi.default.removeAll());
});

router.route('/weight/:date')
.get(function (request, response) {
    response.send(weightApi.default.get(request.params.date));
})
.delete(function(request, response) {
    response.send(weightApi.default.remove(request.params.date));
})
.put(function(request, response) {
    let weight = {
        date: request.params.date,
        weight: request.body.weight
    };
    response.send(weightApi.default.add(weight));
});

app.use('/api', router);
app.listen(PORT);
console.log('Server running at http://localhost:' + PORT);