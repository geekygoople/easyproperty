(function() {
	var app = angular.module('userManagement', []);

	app.filter('searchStatus', function($filter) {
		return function(users, status) {
			if (status == "all")
				return users;
			return $filter('filter')(users, {
				"status": status
			}, true);
		};
	})

	app.directive('userTable', ['$http', function($http) {
		return {
			restrict: 'E',
			templateUrl: 'user-table.html',
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
	}]);

	app.controller('SearchController', function($http, $scope) {
		this.status = 'all';
		$scope.response = [];
		$http.get('./users.json').success(function(data) {
			$scope.response = data;
			console.log($scope);
		});
	});

})();