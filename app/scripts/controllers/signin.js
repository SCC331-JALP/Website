'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('SigninCtrl', function ($scope, $rootScope, $route, $window, $firebaseObject) {

  	var ref = $rootScope.ref;
  	$scope.user = {};

  	$scope.submit = function()
  	{
  		//If fields are filled
  		if($scope.user.email && $scope.user.password){
  			$scope.login();
  		}
  	};

  	$scope.login = function()
  	{
		ref.authWithPassword({
		  email    : $scope.user.email,
		  password : $scope.user.password
		}, function(error, authData) {
		  if (error) {
		    console.log('Login Failed!', error);
		  } else {
		    console.log('Authenticated successfully with payload:', authData);
		    $window.location.href = '/sensor';
		  }
		});
  	};

	ref.onAuth(function(authData){
		$scope.userProfile = authData ? $firebaseObject(ref.child('users').child(authData.uid)) : null;
	});

	$scope.usersRef = $firebaseObject(ref.child('usersRef'));

  });
