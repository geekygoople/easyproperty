(function() {
	var zpropServices = angular.module('zpropServices', ['ngResource']);

	zpropServices.factory('UserService', ['$resource',
		function($resource) {
			return $resource('http://api.zprop.com:8080/eazyprop/users/', {}, {
				save: {
					method: 'POST',
					params: {
						"token": "any test",
						"operatingSiteId": 1,
						"operatingUserId": 1
					},
					isArray: true
				}
			});
		}
	]);


	angular.module('userManagement', ['ngRoute', 'ngResource', 'zpropServices'])

	.config(function($routeProvider) {
		$routeProvider

			.when('/newsletter', {
			//controller: 'UserListController as userList',
			templateUrl: 'pages/newsletter.html'
		})

		.when('/sr', {
			//controller: 'UserListController as userList',
			templateUrl: 'pages/service-request.html'
		})

		.when('/mailbox', {
			//controller: 'UserListController as userList',
			templateUrl: 'pages/mailbox.html'
		})

		.when('/poll', {
			//controller: 'UserListController as userList',
			templateUrl: 'pages/poll.html'
		})

		.when('/logout', {
			//controller: 'UserListController as userList',
			templateUrl: 'pages/logout.html'
		})

		.when('/user', {
			controller: 'UserListController as userList',
			templateUrl: 'pages/list.html'
		})

		.when('/user/edit/:userId', {
			controller: 'EditUserController as editUser',
			templateUrl: 'pages/detail.html'
		})

		.when('/user/new', {
			controller: 'NewUserController as editUser',
			templateUrl: 'pages/newuser.html'
		})

		.otherwise({
			redirectTo: '/user'
		});
	})

	.filter('byStatus', function($filter) {
		return function(users, status) {
			if (status == "all")
				return users;
			return $filter('filter')(users, {
				"status": status
			}, true);
		};
	})

	.directive('userTable', [function() {
		return {
			restrict: 'E',
			templateUrl: 'directives/user-table.html',
			scope: {
				users: "="
			},
			controller: function($scope, $filter) {
				$scope.sendInvitationCode = function() {
					console.log($filter('filter')($scope.users, {
						isChecked: true
					}));
				}
			}
		};
	}])

	.controller('UserListController', function($scope, $resource, $location, UserService) {
		this.status = 'all';
		$scope.userData = [];

	/*	$scope.userData = UserService.save({
			"token": "any test",
			"operatingSiteId": 1,
			"operatingUserId": 1
		}, function(phone) {
			console.log(phone);
		});*/

		/*$http.get('mock_data/users.json').success(function(data) {
			$scope.userData = data;
		});*/

		$scope.userAPI = $resource('mock_data/users.json');
		$scope.userData = $scope.userAPI.query();

		/*$scope.userAPI = $resource('http://api.zprop.com:8080/eazyprop/users', {
			callback: 'JSON_CALLBACK'
		}, {
			get: {
				method: 'JSONP',
				isArray: true
			}
		});
		$scope.userData = $scope.userAPI.save();*/

		/*$http.post('http://api.zprop.com:8080/eazyprop/users/', {
			"token": "any test",
			"operatingSiteId": 1,
			"operatingUserId": 1
		}).success(function(result) {
			$scope.userData = result;
		});*/
	})

	.controller('EditUserController', function($http, $scope, $location) {

	})

	.controller('NewUserController', function($http, $scope, $location) {

	})

})();