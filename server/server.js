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


app.get("/cities", function (req, res) {
    var now = Date.now();
    CityExtra.find(function (err, cities) {
        var result = [];
        _.forEach(cities, function (city) {
            result.push({id: city.id, name: city.name, country: city.country, population: city.population, area: city.area})
        });
        res.send({cities: result});
        console.log('cities call - ' + (Date.now() - now));
    });
});

app.get("/simples", function (req, res) {
    var now = Date.now();
    CitySimple.find(function (err, cities) {
        var result = [];
        _.forEach(cities, function (city) {
            result.push({id: city.id, name: city.name, country: city.country, population: city.population, area: city.area})
        });
        res.send({simples: result});
        console.log('simple call - ' + (Date.now() - now));
    });
});

app.get("/simple", function (req, res) {
    var now = Date.now();
    CitySimple.find(function (err, cities) {
        res.send(cities);
        console.log('simple call - ' + (Date.now() - now));
    });
});

app.get("/media", function (req, res) {
    var now = Date.now();
    CityMedium.find(function (err, cities) {
        var result = [];
        _.forEach(cities, function (city) {
            result.push({id: city.id, name: city.name, country: city.country, population: city.population, area: city.area})
        });
        res.send({mediums: result});
        console.log('medium call - ' + (Date.now() - now));
    });
});

app.get("/medium", function (req, res) {
    var now = Date.now();
    CityMedium.find(function (err, cities) {
        res.send(cities);
        console.log('medium call - ' + (Date.now() - now));
    });
});

app.get("/massives", function (req, res) {
    var now = Date.now();
    CityMassive.find(function (err, cities) {
        var result = [];
        _.forEach(cities, function (city) {
            result.push({id: city.id, name: city.name, country: city.country, population: city.population, area: city.area})
        });
        res.send({massives: result});
        console.log('massive call - ' + (Date.now() - now));
    });
});

app.get("/massive", function (req, res) {
    var now = Date.now();
    CityMassive.find(function (err, cities) {
        res.send(cities);
        console.log('massive call - ' + (Date.now() - now));
    });
});

app.post("/cities", function (req, res) {
    console.log('POST call recieved');
    var now = Date.now();
    var city = new CityExtra(req.body.city);
    city.save(function (err, city) {
        res.send(city.id);
        console.log('POST call - ' + (Date.now() - now));
    });
});

app.post("/add", function (req, res) {
    console.log('POST call recieved');
    var now = Date.now();
    var city;
    if (req.body.hasOwnProperty('data')) city = new CityExtra(JSON.parse(req.body.data));
        else city = new CityExtra(req.body);
    city.save(function (err, city) {
        res.send(city.id);
        console.log('POST call - ' + (Date.now() - now));
    });
});

app.listen(3000);
