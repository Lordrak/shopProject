angular.module('Shop').controller('produitCtrl',function($scope,$http){
    
    	$scope.ajoutProduit = ajoutProduit;

        

    	 function ajoutProduit(nom,prix,type,quantite) {

    		 var produit = {
    		 	 nom : nom,
    		 	 prix :prix+'€',
    		 	 type : type,
    		 	 quantite: quantite

    		 };
    		 console.log(produit);
    		 $http.post('http://localhost:3000/addProduct', produit).then(function(res){
    		 		console.log("produit ajouté");
    		 });

    	}
    	

});