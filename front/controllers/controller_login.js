angular.module('Shop').controller('loginCtrl', function($scope, $http,$state) {
	$scope.panier = [];
	$scope.achat = [];
	$scope.token = "";
	$scope.deleteProduitPanier = deleteProduitPanier;
	$scope.achats = achats;

	if($state.includes('panier')){
			getPanier();
			getAchat();
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
				$state.go('panier');
			})
		}
	}

	function getPanier() {
		$http.get('http://localhost:3000/getPanier/'+ localStorage.getItem('token')).then(function(res){
			$scope.panier = res.data;
		})
	}

	function deleteProduitPanier(element){
		console.log(element);
		var produit = element;
		$http.delete('http://localhost:3000/deletePanier/'+localStorage.getItem('token'), produit).then(function(res) {
			console.log(res.data);
		})
	}

	function achats(){
		$http.put('http://localhost:3000/achatProduit/'+localStorage.getItem('token')).then(function(res) {
			console.log(res.data);
		})
	}

		function getAchat() {
		$http.get('http://localhost:3000/getAchat/'+ localStorage.getItem('token')).then(function(res){
			$scope.achat = res.data;
		})
	}

});