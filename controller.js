angular.module('weatherApplication').controller('WeatherAppController',['$scope','$http','WeatherAppService',
    function($scope,$http, WeatherAppService){
        angular.element(function(){
            $scope.error = false
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
                $scope.getData(element, $scope.SelectCountry)
                sleep(100)

            });
            console.log($scope.TempList)
        }
        //lists of major cities in each specified countries
        var stateListIndia = ['Mumbai', 'Delhi','Banglore','Hyderabad','Ahmedabad','Chennai','Kolkata','Kochi','Thiruvanathapuram', 'Pune', 'Surat', 'Lucknow','Ghaziabad', 'Vijayawada','Faridabad', 'Meerut','Navi Mumbai', 'Howrah', 'Coimbatore', 'Jodhpur', 'Madurai', 'Mysore', 'Gurgaon', 'Mangalore', 'Kozhikode','Agartala', 'Thrissur', 'Pondicherry' ]
        var stateListUSA = ['New York City', 'Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose','Austin','Jacksonville','Fort Worth','Columbus','	Charlotte','Indianapolis','San Francisco', 'Seattle','Denver','Washington','Nashville','Oklahoma City','Boston','El Paso','Portland','Las Vegas','Memphis','Detroit','Baltimore','Milwaukee']
        var stateListUK = ['London','Birmingham','Leeds','Glasgow','Sheffield','Bradford','Liverpool','Edinburgh','Manchester','Bristol', 'Kirklees','Fife','Wirral','North Lanarkshire','Wakefield','Cardiff','Dudley','Wigan','East Riding','South Lanarkshire','Coventry','Belfast','Leicester','Sunderland','Sandwell','Doncaster','Stockport','Sefton','Nottingham']
        var statelistGermany = ['Berlin','Hamburg','Munich','Cologne','Frankfurt am Main','Stuttgart','Dortmund',' Essen','Leipzig','Bremen','Dresden','Hanover','Nuremberg','Duisburg','Bochum','Wuppertal','Bielefeld','Bonn','Karlsruhe','Mannheim','Augsburg','Wiesbaden','Gelsenkirchen','Braunschweig','Chemnitz','Kiel','Aachen']
        var statelistUAE = ['Dubai','Abu Dhabi','Sharjah','Al Ain','Ajman','Ras Al Khaimah','Fujairah','Umm al-Quwain','Khor Fakkan','Kalba','Jebel Ali','Madinat Zayed','Ruwais','Liwa Oasis','Dhaid','Ghayathi','Dibba Al-Hisn','Hatta','Al Madam','Adhen','Dalma','Dadna','Huwaylat','Marawah','Mleiha','Sila','Masfut','Digdaga','Asimah']
        console.log(statelistUAE.length,stateListUSA.length)
        
        
        
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
       
        $scope.getData = function(city, country){
            try{
                WeatherAppService.getWeather(city, country).then(function(response){
                $scope.weatherData = response
                    try{
                        console.log($scope.weatherData)
                        var Items = {item:[$scope.weatherData.data[0].city_name, $scope.weatherData.data[0].app_temp]}
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

}])