angular.module('Shop').component('main',{

	templateUrl: "views/view_main.html",

	controller: "mainCtrl"

});

angular.module('Shop').config(function($stateProvider){

	var createCompte = {

		name: 'createCompte',
		url: '/createCompte',
		templateUrl: 'views/view_creationCompte.html',
		controller: 'userCtrl'
	};

	var produit = {

		name: 'produit',
		url: '/produit',
		templateUrl: 'views/view_produit.html',
		controller : 'produitCtrl'
	};

	var login = {

		name: 'login',
		url: '/login',
		templateUrl: 'views/view_login.html',
		controller: 'loginCtrl'
	};

	var panier = {
		name:'panier',
		url:'/panier',
		templateUrl:'views/view_panier.html',
		controller: 'loginCtrl'
	};

	var addProduit = {

		name: 'addProduit',
		url: '/addProduit',
		templateUrl: 'views/view_addProduit.html',
		controller : 'produitCtrl'
	};


	$stateProvider.state(createCompte);
	$stateProvider.state(produit);
	$stateProvider.state(addProduit);
	$stateProvider.state(login);
	$stateProvider.state(panier);

});