'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:DevCtrl
 * @description
 * # DevCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('DevCtrl', function ($scope, $rootScope, $firebaseArray, $window) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    var isDev = $rootScope.isDev;

    var users = authData ? $firebaseArray(ref.child('users')) : null;
    
    users.$loaded().then(function () {
      $scope.users = users;
    })

    $scope.getLength = function(obj){
      return (obj == null || obj == 'undefined') ? 0 : Object.keys(obj).length;
    }

    $scope.getSensor = function(obj, index){
      return (obj == null || obj == 'undefined') ? null : Object.keys(obj)[index];
    }

  });