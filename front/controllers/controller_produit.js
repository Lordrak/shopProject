angular.module('Shop').controller('produitCtrl',function($scope,$http){
    
    	$scope.ajoutProduit = ajoutProduit;
        $scope.produits = [];
        $scope.panier = [];

        

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
$scope.addProduitPanier =  function (element) {
            var panier = [];
            element.quantite = this.quantite;
            if(localStorage.getItem('panier')){
              $scope.panier = localStorage.getItem('panier');
            }
            panier =  JSON.parse($scope.panier);
            console.log(panier);
            panier.push(element);
            localStorage.setItem('panier', JSON.stringify(panier));
             $http.post('http://localhost:3000/addPanier/'+localStorage.getItem('token'),element).then(function(res){
                console.log(res.data);
             }) 
        }
    	
    	

});