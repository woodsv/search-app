angular.module('srcApp').factory('moviesFactory', ['$http', function($http) {

    var urlBase = 'http://api.themoviedb.org/3/movie/now_playing?api_key=67bfb97a79e0558254dcc7cd34bc8a2a&page=',
    	moviesFactory = {},
    	movies = [];

    moviesFactory.getMovies = function(pageNumber) {
        return $http({
		    method: 'GET',
		    url: urlBase + pageNumber
		  }).then(function(response) {
		  	for(var i = 0; i < response.data.results.length; i++) {
		  		movies.push(response.data.results[i]);
		  	}
		    return response.data;

		  });
    };

    moviesFactory.getMovieDetails = function(id) {
        return _.find(movies, function(movie){return movie.id == id});
    };

    return moviesFactory;
}]);