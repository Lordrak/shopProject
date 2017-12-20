angular.module('Shop').controller('loginCtrl', function($scope, $http,$state) {
	$scope.panier = [];
	$scope.token = "";
	if($state.includes('panier')){
			getPanier();
	}
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
				$state.go('panier');
			})
		}
	}

	function getPanier() {
		$http.get('http://localhost:3000/getPanier/'+ localStorage.getItem('token')).then(function(res){
			$scope.panier = res.data;
			console.log($scope.panier);
		})
	}
});