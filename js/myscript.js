
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
				$scope.latlng = lat + ',' + lon;
			});
		}	else {$scope.errorMessage1 = "Geolocation is not supported by this browser, please use a device that supports GPS";
			};
	};
	$scope.primaryFunction();

	$scope.onStartShowMap = function(){
		$scope.url1 = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyDzBjNNTZDL-eYH_Nbth3IMZTcGN3PR7aw&zoom=4&center=' + $scope.latlng +'&maptype=satellite';
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
					venuePhotos: 1,
					callback : 'JSON_CALLBACK'
				}
			};
		config.params.ll = $scope.latlng;
		$scope.loading = true;
		$http.jsonp(url, config).success(function(response){
			console.log(response.response.groups[0].items);
			var post = response.response.groups[0];
			if(post.items.length !== 0 || post.items.venue.photos.groups.length !== 0){
				$scope.shops = post.items;
				$scope.url2 = 'https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x300&maptype=roadmap&markers=color:red|label:P|' + $scope.latlng +'&center=';
				$scope.loading = false;
			}	else {
					$scope.errorMessage3 = "Sorry, no image for this location";
					$scope.errorMessage2 = "Sorry, there are no recognised shops within 1000km your location";
				};
		});	
	};


	$scope.fetchWeatherCondition = function(){
		var url3 = 'https://api.worldweatheronline.com/free/v1/weather.ashx';
		var config2 = {
			params : {
				format: 'json',
				key: 'f83676bdb9c2eee1f780967602c8faf1fd4d1cb9',
				callback: 'JSON_CALLBACK'
			}
		};
		config2.params.q = $scope.latlng;
		$scope.loading = true;
		$http.jsonp(url3, config2).success(function(response){
			console.log(response);
			$scope.conditions = response;
			$scope.loading = false;
		});
	};

	$scope.reloadPage = function() {
	   	window.location.reload();
	};

	$scope.fetchMapLocation = function(){
		$scope.showMe = 2 + 2;
	};
	$scope.trues = 2 + 3;

}]);