angular.module('movieapp')
	.factory('GetInTheaterMovieService', function($resource){
		return $resource('api/movies/inTheater/:pageId', {pageId: 'pageId'}, {'query': {method: 'GET'}});
	});