(function() {
	var app = angular.module('userManagement', []);


	app.directive('userTable', ['$http', function($http){
		return {
			restrict: 'E',
			templateUrl: 'user-table.html',
			controller: function($scope, $http){
				// this.users = users;
				$http.get('./users.json').success(function(data){
					$scope.userCtrl.users = data;
					console.log($scope);
				});
			},
			controllerAs: 'userCtrl'
		};
	}]);

	var userService = angular.module('userService', ['ngResource']);

	app.controller('SearchController', function(){
		this.status = 'all';
		// this.statuses = ['active','inactive'];
	});

	var users = [{
			id: '1111111111111',
			firstName: 'John',
			lastName: 'Smith',
			role: 'board',
			email: 'j.smith@easyproperty.com',
			status: 'active'
		}, {
			id: '2222222222222',
			firstName: 'Peter',
			lastName: 'Jones',
			role: 'user',
			email: 'jones@xyz.com',
			status: 'active'
		}, {
			id: '3333333333333',
			firstName: 'Holly',
			lastName: 'Mint',
			role: 'user',
			email: 'mint@xyz.com',
			status: 'inactive'
		}, {
			id: '4444444444444',
			firstName: 'Micky',
			lastName: 'Kim',
			role: 'user',
			email: 'micky@xyz.com',
			status: 'active'
		}, {
			id: '5555555555555',
			firstName: 'Richard',
			lastName: 'Rock',
			role: 'user',
			email: 'richard@xyz.com',
			status: 'inactive'
		}

	];
})();