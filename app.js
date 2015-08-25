(function() {
	angular.module('userManagement', ['ngRoute'])

	.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				//controller: 'UserListController as userList',
				templateUrl: 'pages/user.html'
			})

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

	.directive('userTable', ['$http', function($http) {
		return {
			restrict: 'E',
			templateUrl: 'directives/user-table.html',
			scope: {
				users: "="
			},
			controller: function($scope, $http, $filter) {
				$scope.sendInvitationCode = function() {
					console.log($filter('filter')($scope.users, {
						isChecked: true
					}));
				}
			}
		};
	}])

	.controller('UserListController', function($http, $scope, $location) {
		this.status = 'all';
		$scope.userData = [];
		$http.get('mock_data/users.json').success(function(data) {
			$scope.userData = data;
		});
	})

	.controller('EditUserController', function($http, $scope, $location) {

	})

	.controller('NewUserController', function($http, $scope, $location) {

	})

})();