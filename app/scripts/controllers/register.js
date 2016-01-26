'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $window) {

  	var ref = $rootScope.ref;
  	$scope.user = {};

  	$scope.submit = function() 
  	{
  		//If fields are filled
        if($scope.user.firstName && $scope.user.lastName && $scope.user.email && $scope.user.password){
        	$scope.createUser();
        }
    };

    $scope.createUser = function(){
		
	    ref.createUser({
			email: $scope.user.email,
			password: $scope.user.password

	    },function(error, userData){
	    	if(error){
	    		console.log("Error creating user:", error);
	    	}else{
	    		console.log("Successfully created user account with uid:", userData.uid);
	    		$window.location.href = '/signin';
	    	}
	    });
    }
    
  });
