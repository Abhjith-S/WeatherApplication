angular.module('weatherApplication').controller('WeatherAppController',['$scope','$http','WeatherAppService',
    function($scope,$http, WeatherAppService){
        angular.element(function(){
            $scope.error = false;
        });

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        $scope.SelectCountry = ''
        $scope.stateList = []

        $scope.selectCountry = function(val){
            $scope.SelectCountry = val;
            array = $scope.SelectStateList()
            $scope.TempList = []
            array.forEach(element => {
                $scope.getData(element)
                sleep(100)

            });
            console.log($scope.TempList)
        }
        //lists of major cities in each specified countries
        var stateListIndia = ['Mumbai', 'Delhi','bengaluru','Hyderabad','Ahmedabad','Chennai','Kolkata','Kochi','Trivandrum', 'Pune', 'Surat', 'Lucknow','Ghaziabad', 'Vijayawada','Faridabad', 'Meerut','Navi Mumbai', 'Howrah', 'Coimbatore', 'Jodhpur', 'Madurai', 'Mysore', 'Gurgaon', 'Mangalore', 'Kozhikode','Agartala', 'Thrissur', 'Pondicherry' ]
        var stateListUSA = ['New York City', 'Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose','Austin','Jacksonville','Fort Worth','Columbus','	Charlotte','Indianapolis','San Francisco', 'Seattle','Denver','Washington','Nashville','Oklahoma City','Boston','El Paso','Portland','Las Vegas','Memphis','Detroit','Baltimore','Milwaukee']
        var stateListUK = ['London','Birmingham','Leeds','Glasgow','Sheffield','Bradford','Liverpool','Edinburgh','Manchester','Bristol', 'Kirklees','Fife','Wirral','North Lanarkshire','Wakefield','Cardiff','Dudley','Wigan','South Lanarkshire','Coventry','Belfast','Leicester','Sunderland','Sandwell','Doncaster','Stockport','Sefton','Nottingham']
        var statelistGermany = ['Berlin','Hamburg','Munich','Cologne','Frankfurt am Main','Stuttgart','Dortmund',' Essen','Leipzig','Bremen','Dresden','Hanover','Nuremberg','Duisburg','Bochum','Wuppertal','Bielefeld','Bonn','Karlsruhe','Mannheim','Augsburg','Wiesbaden','Gelsenkirchen','Braunschweig','Chemnitz','Kiel','Aachen']
        var statelistFrance = []
        console.log(stateListUSA.length)
        
        
        
        $scope.SelectStateList = function(){
            if($scope.SelectCountry == 'India'){
                $scope.stateList =  stateListIndia;
                return $scope.stateList
            }
            else if($scope.SelectCountry == 'America'){
                $scope.stateList =  stateListUSA;
                return $scope.stateList
            }
            else if($scope.SelectCountry == 'UK'){
                $scope.stateList =  stateListUK;
                return $scope.stateList
            }
            else if($scope.SelectCountry == 'Germany'){
                $scope.stateList =  statelistGermany;
                return $scope.stateList
            }
            else if($scope.SelectCountry == 'UAE'){
                $scope.stateList =  statelistUAE;
                return $scope.stateList
            }
        }

        //get weather data
       
        $scope.getData = function(city){
            try{
                WeatherAppService.getWeather(city).then(function(response){
                $scope.weatherData = response
                    try{
                        // console.log($scope.weatherData)
                        var Items = {item:[$scope.weatherData.name,$scope.weatherData.main.temp ]}
                        console.log(Items)
                    // /console.log($scope.weatherData.data[0].city_name, $scope.weatherData.data[0].app_temp)
                        $scope.TempList.push(Items)
                    }
                    catch(e){
                        console.log(e)
                    }
            })
            }
            catch(e){
                console.log(e)
                $scope.error = true;
            }

        }
        $scope.getcity = function(country){
            $scope.abhi=[];
            try{
                WeatherAppService.post(country)
                .then(data => {
                    data.data.forEach(function(post){
                        // console.log(post,"----")
                        $scope.abhi.push(post);
                        console.log("man   ::: "+$scope.abhi); 
                    }) ;
                })
                .catch(err => console.log(err));
            }
            catch(e){
                console.log(e)
                $scope.error = true;
            }

           
        }

}])