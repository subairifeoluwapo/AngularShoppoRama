
var app = angular.module('AngularShoppoRama', []);

app.controller('sectionController', ['$scope','$http', function($scope, $http){

	$scope.primaryFunction = function(){	
		var lat;
		var lon;
		// $scope.map = {center: {latitude: 6.441158, longitude: 3.417977}, zoom: 13};
		// $scope.options = {scrollwheel: false};	
		if(navigator.geolocation){	
			navigator.geolocation.getCurrentPosition(function(position){
				console.log(position);
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				console.log(lat);
				console.log(lon);

				$scope.onStartShowMap = function(){
					var test1 = {
						params: {
							url: 'https://www.google.com/maps/embed/v1/view?key=AIzaSyDzBjNNTZDL-eYH_Nbth3IMZTcGN3PR7aw&zoom=11&maptype=satellite',
							q: position.coords.latitude + ',' + position.coords.longitude
						}
					};
					console.log(test1.params);
					$scope.loc = test1;
				};
				$scope.onStartShowMap();

				$scope.fetchLocations = function() {
					var url = 'https://api.foursquare.com/v2/venues/explore';
					var config = {
							params : {
								client_id: 'HBMVGNAHBQMV5A0FM3RLUM1NIXXZ1CU4XXOLCOP4GLXGGBHC', 
								client_secret: 'Q4RXJT4IZVWALD1HIOWNKXVUPVJZBUJ5JEPDU4HYD1KVF1GD', 
								section: 'shops', 
								v: '20130815', 
								callback : 'JSON_CALLBACK'
							}
					};
					config.params.ll = lat + ',' + lon;
					console.log(config.params.ll);
					$http.jsonp(url, config).success(function(response){
						console.log(response.response.groups[0].items);
						var post = response.response.groups[0];
						$scope.shops = post.items;

						$scope.fetchMapLocation = function(){
							var test2 = {
									params:	{
										url: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDzBjNNTZDL-eYH_Nbth3IMZTcGN3PR7aw&zoom=11&maptype=roadmap&q='
									}
							}
							console.log(test2.params);
							$scope.loc2 = test2;
						};
					});	
				};

				$scope.fetchWeatherCondition = function(){
					var url = 'https://api.worldweatheronline.com/free/v1/weather.ashx';
					var config = {
						params : {
							format: 'json',
							key: 'f83676bdb9c2eee1f780967602c8faf1fd4d1cb9',
							callback: 'JSON_CALLBACK'
						}
					};
					config.params.q = lat + ',' + lon;
					console.log(config.params.q);
					$http.jsonp(url, config).success(function(response){
						console.log(response);
						$scope.conditions = response;
					});
				};
			});
		}	else {alert("Geolocation is not supported by this browser.");
			};
		$scope.reloadPage = function() {
	   		window.location.reload();
		};
	};
	$scope.primaryFunction();
}]);