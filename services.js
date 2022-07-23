angular.module('weatherApplication').service('WeatherAppService',['$http','$q',
function($http, $q){
    var WeatherAppService = {
        // give functions
        getWeather:getWeather,
        getCities:getCities,
        post:post
    };
    return WeatherAppService
    //function to get weather data
    function getWeather(city){
        var baseURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bf0b89712c52d65d5351033913e3d2e0&units=metric"
        // var baseURL = "https://api.weatherbit.io/v2.0/current?city="+city+"&country="+country+"&key=25ddacfe8f8a405aac37bad9066da07d"
        var def = $q.defer();
        var config = {methord: "GET", headers:{'Content-Type':"application/json ; charset=UTF-8"}};
        $http.get(baseURL, config).success(function(response){
            def.resolve(response);
        }).error(function(){
            def.reject({error:"error"})
        });
        return def.promise
    
    
    };

    function getCities(country){  
        var def = $q.defer();
        var config = {methord: "POST", headers:{'Content-Type':"application/json ; charset=UTF-8"}, body:{'country':country}};
        $http.post(BaseUrl, config).success(function(response){
            def.resolve(response);
        }).error(function(){
            def.reject({error:"error"})
        });
        return def.promise
        

    }

    async function  post(country) {
        var BaseUrl = "https://countriesnow.space/api/v0.1/countries/cities"
        const response = await fetch(BaseUrl, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({'country':country})
        });
    
        const resData = await response.json();
        return resData;
       
      }



    // function getCities() {
    //     const response =  fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`).then();
    
    //     const responseData =  response.json();
    
    //     return responseData.current_observation;
    //   }




}]);