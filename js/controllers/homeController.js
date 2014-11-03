angular.module('movieapp')
	.controller('homeController', ['$scope', '$rootScope', 'GetInTheaterMovieService', function($scope, $rootScope, GetInTheaterMovieService) {
		$scope.movies = {};
		$scope.movieNumber = 0;
		$scope.moviePage = 1;
		$scope.pageLimit = 16;
		$scope.pages = [];
		$scope.loading = true;

		GetInTheaterMovieService.query({
			pageId: $scope.moviePage
			}, function(response) {
			$scope.movieNumber = response.total;
			$scope.movies = response.movies;
			$scope.calAveAge();
			$scope.pageIndex();
			$scope.loading = false;
		});

		$scope.calAveAge = function() {
			for(var i=0;i<$scope.movies.length; i++) {
				var ave = 0;
				var casts = $scope.movies[i].casts;
				for(var j=0;j<casts.length;j++) {
					if(casts[j].dob === "") {
						ave += 30;
					}
					else {
						var dob = new Date(casts[j].dob);
						var today = new Date();
						ave += today.getFullYear() - dob.getFullYear();
					}
				}
				if(casts.length > 0) {
					$scope.movies[i].averageAge = ave/casts.length;
				}
				else {
					$scope.movies[i].averageAge = 30;
				}
			}
		};

		$scope.pageIndex = function() {
			var pageNumber = $scope.movieNumber/$scope.pageLimit;
			if($scope.movieNumber%$scope.pageLimit>0) {
				pageNumber++;
			}
			var newpages = Array.apply(null, Array(pageNumber));
			$scope.pages = newpages.map(function(x, i) {return i+1});
		};

		$scope.getClass = function(index) {
			if(index === $scope.moviePage - 1) {
				return "active";
			}
			else {
				return "pointer-cursor";
			}
		};

		$scope.getPage = function(index) {
			if(index === $scope.moviePage - 1) {
				return;
			}
			else {
				$scope.moviePage = index + 1;
				$scope.loading = true;
				GetInTheaterMovieService.query({
					pageId: $scope.moviePage
					}, function(response) {
					$scope.movieNumber = response.total;
					$scope.movies = response.movies;
					$scope.calAveAge();
					$scope.pageIndex();
					$scope.loading = false;
				});
			}
		};
	}]);