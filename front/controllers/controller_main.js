angular.module('Shop').controller('mainCtrl', function($scope, $http, $state){
$scope.token = localStorage.getItem('token');
    	   
    	$scope.disconnect = function(){
    		localStorage.removeItem('token');
    		$state.go('login');
    	}
});