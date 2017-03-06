var express = require('express')
var app = express();
var path = require('path');
var robinhood = require('robinhood');
var googleFinance = require('google-finance');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var router = express.Router();

// API Endpoints
var quotesApi = require('./src/server/router/robinhoodApi');
var googleFinanceApi = require('./src/server/router/googleFinanceApi');

app.use(quotesApi);
app.use(googleFinanceApi);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/src/client', express.static(__dirname + '/src/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at", host, port);
});


module.exports = app;
