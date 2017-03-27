var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var _ = require('underscore');
var path = require('path');

var app = express();
app.use(cors());
app.use(bodyParser());

mongoose.connect("mongodb://localhost/cityList");
var CityExtra = mongoose.model('CityExtra', {name: String, country: String, population: Number, area: Number});
var CitySimple = mongoose.model('CitySimple', {name: String, country: String, population: Number, area: Number});
var CityMedium = mongoose.model('CityMedium', {name: String, country: String, population: Number, area: Number});
var CityMassive = mongoose.model('CityMassive', {name: String, country: String, population: Number, area: Number});

app.get("/", function (req, res) {
    var now = Date.now();
    CityExtra.find(function (err, cities) {
        res.send(cities);
        console.log('home call - ' + (Date.now() - now));
    });
});

app.get("/simple", function (req, res) {
    var now = Date.now();
    CitySimple.find(function (err, cities) {
        res.send(cities);
        console.log('simple call - ' + (Date.now() - now));
    });
});

app.get("/medium", function (req, res) {
    var now = Date.now();
    CityMedium.find(function (err, cities) {
        res.send(cities);
        console.log('medium call - ' + (Date.now() - now));
    });
});

app.get("/massive", function (req, res) {
    var now = Date.now();
    CityMassive.find(function (err, cities) {
        res.send(cities);
        console.log('massive call - ' + (Date.now() - now));
    });
});

app.post("/add", function (req, res) {
    var now = Date.now();
    var city = new CityExtra(req.body);
    city.save(function (err, city) {
        res.send(city.id);
        console.log('POST call - ' + (Date.now() - now));
    });
});

app.listen(3000);
