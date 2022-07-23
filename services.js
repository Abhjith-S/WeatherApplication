angular.module('weatherApplication').service('WeatherAppService',['$http','$q',
function($http, $q){
    var WeatherAppService = {
        // give functions
        getWeather:getWeather
    };
    return WeatherAppService

    function getWeather(city, country){
        var baseURL = "https://api.weatherbit.io/v2.0/current?city="+city+"&country="+country+"&key=25ddacfe8f8a405aac37bad9066da07d"
        var def = $q.defer();
        var config = {methord: "GET", headers:{'Content-Type':"application/json ; charset=UTF-8"}};
        $http.get(baseURL, config).success(function(response){
            def.resolve(response);
        }).error(function(){
            def.reject({error:"error"})
        });
        return def.promise
    
    
    };



}]);