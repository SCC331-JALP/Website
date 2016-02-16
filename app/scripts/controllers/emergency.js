'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:EmergencyCtrl
 * @description
 * # EmergencyCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('EmergencyCtrl', function ($scope, $rootScope, $firebaseArray, $window) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    var isES = $rootScope.isES;

    var users = authData ? $firebaseArray(ref.child('users')) : null;

    users.$loaded().then(function () {
      $scope.users = users;
      //console.log(users);
    })

    $scope.isES = function(){
      if(!isES){
        $window.location.href = '/sensor';
      }else{
        return true;
      }
    }

  });
