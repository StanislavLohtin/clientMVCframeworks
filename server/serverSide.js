var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var _ = require('underscore');
var path = require('path');

var app = express();
app.use(cors());
app.use(bodyParser());
app.use('/static', express.static(path.join(__dirname, 'bower_components')))
//app.use(express.static('serverbower_components'));

mongoose.connect("mongodb://localhost/cityList");
var CityExtra = mongoose.model('CityExtra', {name: String, country: String, population: Number, area: Number});
var CitySimple = mongoose.model('CitySimple', {name: String, country: String, population: Number, area: Number});
var CityMedium = mongoose.model('CityMedium', {name: String, country: String, population: Number, area: Number});
var CityMassive = mongoose.model('CityMassive', {name: String, country: String, population: Number, area: Number});

app.get("/", function (req, res) {
    var now = Date.now();
    CityExtra.find(function (err, cities) {
        var template = getTemplate(cities);
        res.send(template);
        console.log('home call - ' + (Date.now() - now));
    });
});

app.get("/simple", function (req, res) {
    var now = Date.now();
    CitySimple.find(function (err, cities) {
        var template = getTemplate(cities);
        res.send(template);
        console.log('simple call - ' + (Date.now() - now));
    });
});

app.get("/medium", function (req, res) {
    var now = Date.now();
    CityMedium.find(function (err, cities) {
        var template = getTemplate(cities);
        res.send(template);
        console.log('medium call - ' + (Date.now() - now));
    });
});

app.get("/massive", function (req, res) {
    var now = Date.now();
    CityMassive.find(function (err, cities) {
        var template = getTemplate(cities);
        res.send(template);
        console.log('massive call - ' + (Date.now() - now));
    });
});

app.post("/add", function (req, res) {
    var now = Date.now();
    var city = new CityExtra(req.body);
    city.save(function (err, city) {
        res.redirect('/');
        console.log('POST call - ' + (Date.now() - now));
    });
});

app.listen(3000);

function getTemplate(list) {
    var result = '<!DOCTYPE html>'+
        '<html lang="en">'+
        '<head>'+
        '<meta charset="UTF-8">'+
        ' <title>CityList</title>'+
        ' <link rel="stylesheet" href="/static/bootstrap/dist/css/bootstrap.min.css">'+
        ' </head>'+
        '<body>'+
        '<div class="col-xs-8 col-xs-offset-2">'+
        ' <h1 class="text-center"> City List Rendered on Server </h1>' +
        ' <br>'+
        '    <div class="col-xs-6 col-xs-offset-3 row well">' +
        '    <form action="/add" method="post">' +
        '    <div class="form-group">' +
        '    <label for="nameInput">Enter city name</label>' +
        '<input id="nameInput" name="name" class="form-control" type="text" placeholder="Name">' +
        '    </div>' +
        '    <div class="form-group">' +
        '    <label for="countryInput">Enter country name</label>' +
        '<input id="countryInput" name="country" class="form-control" type="text" placeholder="Country">' +
        '    </div>' +
        '    <div class="form-group">' +
        '    <label for="populationInput">Enter city population</label>' +
        '<input id="populationInput" name="population" class="form-control" type="number">' +
        '    </div>' +
        '    <div class="form-group">' +
        '    <label for="areaInput">Enter city area</label>' +
        '<input id="areaInput" name="area" class="form-control" type="number">' +
        '    </div>' +
        '    <button type="submit" class="btn btn-success center-block">' +
        '    <span class="glyphicon glyphicon-plus"></span> Add' +
        '    </button>' +
        '    </form>' +
        '    </div>' +
        '     <div class="col-xs-12 well">' +
        '     <div class="col-xs-4">' +
        '     <form action="/simple"><button type="submit" class="btn btn-primary center-block"> Simple GET </button></form>' +
        ' </div>' +
        ' <div class="col-xs-4">' +
        '     <form action="/medium"><button type="submit" class="btn btn-primary center-block"> Medium GET </button></form>' +
        ' </div>' +
        ' <div class="col-xs-4">' +
        '     <form action="/massive"><button type="submit" class="btn btn-primary center-block"> Massive GET </button></form>' +
        ' </div>' +
        ' </div>' +
        ' <table class="table table-bordered table-striped table-hover">' +
        '     <tr>' +
        '     <th> Name </th>' +
        '     <th> Country </th>' +
        '     <th> Population </th>' +
        '     <th> Area </th>' +
        '     </tr>';
    _.forEach(list, function (city) {
        result +=  ' <tr>' +
            '     <td>' + city.name + '</td>' +
            ' <td>' + city.country + '</td>' +
            ' <td>' + city.population + '</td>' +
            ' <td>' + city.area + ' &#13218; </td>' +
            ' </tr>';
    });
    result += ' </table>' +
        ' </div>' +
        ' <script src="/static/jquery/dist/jquery.min.js"></script>' +
        '     <script src="/static/bootstrap/dist/js/bootstrap.min.js"></script>' +
        '     </body>' +
        '     </html>';
    return result;
}

