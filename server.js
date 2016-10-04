"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.post('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
var port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});