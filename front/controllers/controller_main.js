angular.module('Shop').controller('mainCtrl', function($scope, $http){
	$scope.ajoutProduit = ajoutProduit;
        $scope.produits = [];


        displayProduit();
        

    	 function ajoutProduit(nom,prix,type,quantite) {
    		 var produit = {
    		 	 nom : nom,
    		 	 prix :prix+'€',
    		 	 type : type,
    		 	 quantite: quantite

    		 };
    		 $http.post('http://localhost:3000/addProduct', produit).then(function(res){
    		 		console.log("produit ajouté");
    		 });
    	 }

    	function displayProduit() {
              
              $http.get('http://localhost:3000/getProduct').then(function(res){

              $scope.produits = res.data;
              

              	  
              });


    	}
    	   
    	
});