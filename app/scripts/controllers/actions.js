'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:ActionsCtrl
 * @description
 * # ActionsCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('ActionsCtrl', function ($scope, $rootScope, $firebaseArray) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var scriptReference = ref.child('users').child(UID).child('data').child('scripts');
        $scope.scripts = $firebaseArray(scriptReference);
      }
    })
  });
