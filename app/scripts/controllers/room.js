'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('RoomCtrl', function ($scope,$rootScope, $firebaseArray, $routeParams) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users').child(UID).child('data').child('spots');
        var roomReference = ref.child('users').child(UID).child('data').child('rooms');

        $scope.sensors = $firebaseArray(userReference);

        console.log($routeParams.room);
        $scope.roomName = $routeParams.room;
      }
    })
  });
