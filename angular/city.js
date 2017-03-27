app.factory('City', function () {

    var City = function (object) {
        this.name = object.name ? object.name : 'No name';
        this.country = object.country ? object.country : 'No country';
        this.population = object.population ? object.population : 0;
        this.area = object.area ? object.area : 0;
    };

    City.prototype.toString = function() {
        return this.name + ' in ' + this.country + ' with ' + this.population + 'citizens. ' + this.area + 'square km big.';
    };

    return City;
});