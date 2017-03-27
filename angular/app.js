var app = angular.module('bachelor', []);
app.controller("CityListController", ['$http', '$scope', 'City', function ($http, $scope, City) {
    $scope.newCity = {name: 'Berlin', country: 'Germany', population: 3520031, area: 892};

    //var baseURL = "http://localhost:3000";
    var baseURL = "http://192.168.2.104:3000";

    $scope.getAllCities = function(url) {
        $http.get(baseURL + url).then(function (cities) {
            if (!cities.data) return;
            $scope.cities = [];
            angular.forEach(cities.data, function (city) {
                $scope.cities.push(new City(city));
            });
            console.log($scope.cities.length);
        });
    };

    $scope.getAllCities('/');

    $scope.simpleGET = function () {
        $scope.getAllCities('/simple');
    };

    $scope.mediumGET = function () {
        $scope.getAllCities('/medium');
    };

    $scope.massiveGET = function () {
        $scope.getAllCities('/massive');
    };

    $scope.addNewCity = function () {
        var newCity = new City($scope.newCity);
        $http.post(baseURL + '/add', newCity).then(function (data) {
            console.log(data.data);
            newCity.id = data.data;
            $scope.cities.push(newCity);
            //$scope.newCity = {name: '', country: '', population: 0, area: 0};
        })
    };

}]);