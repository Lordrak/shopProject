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
		templateUrl: 'views/view_produit.html'
	};

	var login = {

		name: 'login',
		url: '/login',
		templateUrl: 'views/view_login.html'
	}

	$stateProvider.state(createCompte);
	$stateProvider.state(produit);
	$stateProvider.state(login);

});