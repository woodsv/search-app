'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when("/", {
    templateUrl : "search/searchView.html"
  });
}]);

