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
	    		
	    		//Should be private to user
				var usersProfileRef = ref.child("users").child(userData.uid);
				usersProfileRef.set({
					'firstName': $scope.user.firstName,
					'lastName': $scope.user.lastName
				});

				//Should be accessed to the world
				var email = $scope.user.email.replace("@", " ");
				var email = email.replace(".", " ");
				console.log(email);
				var usersRef = ref.child("usersRef").child(email);
				usersRef.set({
					'uid': userData.uid
				});
	    	}
	    });
    }
    
  });
