
var app = angular.module('AngularShoppoRama', []).config(function($sceProvider){
	$sceProvider.enabled(false);
});

app.controller('sectionController', ['$scope','$http', function($scope, $http) {

	$scope.primaryFunction = function(){
		if(navigator.geolocation){	
			navigator.geolocation.getCurrentPosition(function(position){
				console.log(position);
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				console.log(lat);
				console.log(lon);
				$scope.latlng = lat + ',' + lon;
				$scope.onStartShowMap();
			});
		}	else {alert("Geolocation is not supported by this browser.");
			};
	};
	$scope.primaryFunction();

	$scope.onStartShowMap = function(){
		$scope.url1 = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyDzBjNNTZDL-eYH_Nbth3IMZTcGN3PR7aw&zoom=3&maptype=satellite&center=' + $scope.latlng;
		console.log($scope.url1);
	};


	$scope.fetchLocations = function() {
		var url = 'https://api.foursquare.com/v2/venues/explore';
		var config = {
				params : {
					client_id: 'HBMVGNAHBQMV5A0FM3RLUM1NIXXZ1CU4XXOLCOP4GLXGGBHC', 
					client_secret: 'Q4RXJT4IZVWALD1HIOWNKXVUPVJZBUJ5JEPDU4HYD1KVF1GD', 
					section: 'shops', 
					v: '20130815', 
					venuephotos: 1,
					callback : 'JSON_CALLBACK'
				}
			};

		config.params.ll = $scope.latlng;
		console.log(config.params.ll);
		$http.jsonp(url, config).success(function(response){
			console.log(response.response);
			var post = response.response.groups[0];
			$scope.shops = post.items;
			$scope.url2 = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDzBjNNTZDL-eYH_Nbth3IMZTcGN3PR7aw&zoom=11&maptype=roadmap&q=lagos';
		});	
	};


	$scope.fetchWeatherCondition = function(){
		var urll = 'https://api.worldweatheronline.com/free/v1/weather.ashx';
		var config2 = {
			params : {
				format: 'json',
				key: 'f83676bdb9c2eee1f780967602c8faf1fd4d1cb9',
				callback: 'JSON_CALLBACK'
			}
		};
		config2.params.q = $scope.latlng;
		console.log(config2.params.q);
		$http.jsonp(urll, config2).success(function(response){
			console.log(response);
			$scope.conditions = response;
		});
	};


	$scope.reloadPage = function() {
	   	window.location.reload();
	};

	
	$scope.fetchMapLocation = function(){
		$scope.showMe = 2 + 2;
	};
}]);