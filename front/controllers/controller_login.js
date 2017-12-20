angular.module('Shop').controller('loginCtrl', function($scope, $http) {
	$scope.panier = [];
	$scope.token = "";
	$scope.connect = function() {
		if (this.username && this.password) {
			var connect = {
				username: this.username,
				password: this.password
			}

			$http.post('http://localhost:3000/login', connect).then(function(res) {
				localStorage.setItem('token',res.data.token);
				$scope.token = res.data.token;
				console.log($scope.token);
			})
		}
	}

	function getPanier() {
		$http.get('/getPanier/'+ $scope.token).then(function(res){
			$scope.panier = res.data;
			console.log($scope.panier);
		})
	}
});