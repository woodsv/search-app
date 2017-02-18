angular.module('myApp').controller('SearchController', ['$scope', '$http',function($scope, $http) {
	$scope.searchValue = '';
    //initialize page
    init();

    
    function init() {
        let movies = [];
        return $http({
		    method: 'GET',
		    url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=67bfb97a79e0558254dcc7cd34bc8a2a&page=1'
		}).then(function(response) {
		  	for(var i = 0; i < response.data.results.length; i++) {
		  		movies.push(response.data.results[i]);
		  	}
		  	console.log(response.data);
		  	$scope.movies = movies;

		});
    }

    $scope.getSearchResult = function(searchValue){
		let movies = [];
        console.log(searchValue);
        return $http({
		    method: 'GET',
		    url: 'https://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query='+$scope.searchValue+'&include_adult=false'
		}).then(function(response) {
		  	for(var i = 0; i < response.data.results.length; i++) {
		  		movies.push(response.data.results[i]);
		  	}
		  	console.log(response.data);
		  	$scope.movies = movies;
		    return response.data;

		});
    };

    
        

}]);