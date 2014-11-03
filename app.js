var movieapp = angular.module('movieapp', ['ngResource', 'ui.router', 'ngRoute', 'ngAnimate'])
movieapp.config(function($routeProvider){
	$routeProvider.
		when('/home',{
			templateUrl:'views/home.html'
		})
		.otherwise({
			redirectTo: '/home'
		});
});