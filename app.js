(function() {
	var app = angular.module('userManagement', []);

	app.directive('userTable', ['$http', function($http) {
		return {
			restrict: 'E',
			templateUrl: 'user-table.html',
			controller: function($scope, $http, $filter) {
				$http.get('./users.json').success(function(data) {
					$scope.userCtrl.users = data;
					console.log($scope);
				});
				$scope.sendInvitationCode = function() {
					console.log($filter('filter')($scope.userCtrl.users, {
						isChecked: true
					}));
				}
			},
			controllerAs: 'userCtrl'
		};
	}]);

	app.controller('SearchController', function() {
		this.status = 'all';
	});

})();