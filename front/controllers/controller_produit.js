angular.module('Shop').controller('produitCtrl',function($scope,$http){
    
    	$scope.ajoutProduit = "";

         ajoutProduit();

    	 function ajoutProduit() {

    		 var produit = {
    		 	 nom : "poulet",
    		 	 prix :"5€",
    		 	 type : "frit",
    		 	 quantite: 2

    		 };

    		 $http.post('/addProduct', produit).then(function(res){
    		 		console.log("produit ajouté");
    		 });

    	}
    	

});