angular.module('myApp').controller('SearchController', ['$scope', '$http',function($scope, $http) {
	$scope.searchValue = '';
	$scope.curPage = 1;
	$scope.numberOfPages = 0;
	$scope.totalResults = 0;
    //initialize page
    
    
    function init() {
        $scope.getNowPlaying();
    }

    $scope.getNowPlaying = function (){
    	return $http({
		    method: 'GET',
		    url: 'http://api.themoviedb.org/3/movie/now_playing?api_key=67bfb97a79e0558254dcc7cd34bc8a2a&page='+$scope.curPage
		}).then(function(response) {
		  	let movies = [];
		  	for(var i = 0; i < response.data.results.length; i++) {
		  		movies.push(response.data.results[i]);
		  	}
		  	console.log(response.data);
		  	$scope.searchValue = '';
		  	$scope.movies = movies;
		  	$scope.curPage = response.data.page;
		  	$scope.totalResults = response.data.total_results;
 			$scope.numberOfPages = response.data.total_pages;
		});
	};

    $scope.getSearchResult = function(){
    	return $http({
		    method: 'GET',
		    url: 'https://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query='+$scope.searchValue+'&page='+$scope.curPage+'&include_adult=false'
		}).then(function(response) {
		  	let movies = [];
		  	for(var i = 0; i < response.data.results.length; i++) {
		  		movies.push(response.data.results[i]);
		  	}
		  	//console.log(response.data);
		  	$scope.movies = movies;
		  	$scope.curPage = response.data.page;
		  	$scope.totalResults = response.data.total_results;
 			$scope.numberOfPages = response.data.total_pages;
		});
    };

    $scope.getNextPage = function(){
    	$scope.curPage = $scope.curPage+1;
    	if ($scope.searchValue==""){
    		$scope.getNowPlaying();
    	}else{
    		$scope.getSearchResult();
    	}
    };

    $scope.getPreviousPage = function(){
    	if($scope.curPage<=1){
    		return;
    	}else{
    		$scope.curPage = $scope.curPage-1;
    	}
    	if ($scope.searchValue==""){
    		$scope.getNowPlaying();
    	}else{
    		$scope.getSearchResult();
    	}
    };

    $scope.getFirstPage = function(){
    	$scope.curPage = 1;
    	if ($scope.searchValue==""){
    		$scope.getNowPlaying();
    	}else{
    		$scope.getSearchResult();
    	}
    };

    $scope.getLastPage = function(){
    	$scope.curPage = $scope.numberOfPages;
    	if ($scope.searchValue==""){
    		$scope.getNowPlaying();
    	}else{
    		$scope.getSearchResult();
    	}
    };

    init();
}]);
