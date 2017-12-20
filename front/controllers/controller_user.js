

angular.module('Shop').controller('userCtrl',function($scope,$http){

	$scope.message = "Message test";
	$scope.submit = function() {
		var submit = {
			username: this.username,
			password: this.password,
			nom: this.nom,
			prenom: this.prenom
		}

		$http.post('http://localhost:3000/createUser',submit).then(function(res){
             console.log(res.data);
		});
	}


});