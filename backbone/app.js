//var baseURL = 'http://192.168.2.102:3000/';
var baseURL = 'http://192.168.2.104:3000/';

City = Backbone.Model.extend({
    url: baseURL + 'add',
    initialize: function() {
        this.name = '';
        this.country = '';
        this.population = 1;
        this.area = 1;
    }
});

GetButtons = Backbone.View.extend({
    events: {
        "click .simple-get" : "simpleGET",
        "click .medium-get" : "mediumGET",
        "click .massive-get" : "massiveGET"
    },
    initialize: function() {
        this.render();

    },
    render: function () {
        this.$el.html('<div class="col-xs-4"> <button type="submit" class="simple-get btn btn-primary center-block"> Simple GET </button> </div>' +
            '<div class="col-xs-4"> <button type="submit" class="medium-get btn btn-primary center-block"> Medium GET </button> </div>' +
            '<div class="col-xs-4"> <button type="submit" class="massive-get btn btn-primary center-block"> Massive GET </button> </div>');
    },
    simpleGET: function () {
        cities.url = baseURL + 'simple';
        loadCities(cities);
    },
    mediumGET: function () {
        cities.url = baseURL + 'medium';
        loadCities(cities);
    },
    massiveGET: function () {
        cities.url = baseURL + 'massive';
        loadCities(cities);
    }
});

AddButton = Backbone.View.extend({
    events: {
        "click .btn" : "addCity"
    },
    initialize: function() {
        this.render();

    },
    render: function () {
        this.$el.html('<button type="submit" class="simple-get btn btn-success center-block"> ' +
            '<span class="glyphicon glyphicon-plus"></span> Add </button>');
    },
    addCity: function () {
        var newCity = new City();
        newCity.name = $('#nameInput').val();
        newCity.country = $('#countryInput').val();
        newCity.population = $('#populationInput').val();
        newCity.area = $('#areaInput').val();
        cities.add(newCity);
        cities.create({
            url: baseURL + 'add',
            data: JSON.stringify({'name': newCity.name, 'country': newCity.country, 'population': newCity.population, 'area': newCity.area})
        });
    }
});

CityTableLine = Backbone.View.extend({
    initialize: function() {
        $("#cityTable").append('<tr> <td>' + this.attributes.name + '</td> <td>' + this.attributes.country + '</td> ' +
            '<td>' + this.attributes.population + '</td> <td>' + this.attributes.area + ' &#13218;</td></tr>');
    }
});

CityTableHeaders = Backbone.View.extend({
    initialize: function() {
        $("#tableArea").html('<table id="cityTable" class="table table-bordered table-striped table-hover">' +
            '<tr> <th> Name </th> <th> Country </th> <th> Population </th> <th> Area </th> </tr> </table>');
    }
});

CityCollection = Backbone.Collection.extend({
    model: City,
    url: baseURL
});

var cities = new CityCollection();
var loadCities = function () {
    //$("#cityTable").html('');
    new CityTableHeaders();
    if (cities) cities.fetch().then(function () {
        _.forEach(cities.models, function (city) {
            new  CityTableLine(city);
        })
    });
};

$(document).ready(function () {
   new GetButtons({el: $("#buttonArea")});
   new AddButton({el: $("#AddButtonArea")});
   loadCities(cities);
});