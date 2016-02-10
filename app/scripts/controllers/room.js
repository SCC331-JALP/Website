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
        var query = userReference.orderByChild("room").equalTo($scope.roomName);
        $scope.sensors = $firebaseArray(query);

        $scope.isCompass = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "c"){
              return true;
            }
          }
          return false;
        }

        $scope.isTemp = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "t"){
              return true;
            }
          }
          return false;
        }

        $scope.isLight = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "l"){
              return true;
            }
          }
          return false;
        }

        $scope.isAcceleration = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "a"){
              return true;
            }
          }
          return false;
        }

        $scope.isLeftButton = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "b"){
              return true;
            }
          }
          return false;
        }

        $scope.isRightButton = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "r"){
              return true;
            }
          }
          return false;
        }

        $scope.isSound = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "s"){
              return true;
            }
          }
          return false;
        }

        $scope.isBattery = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "e"){
              return true;
            }
          }
          return false;
        }

        $scope.isInfrared = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "i"){
              return true;
            }
          }
          return false;
        }

        $scope.isCompass = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "c"){
              return true;
            }
          }
          return false;
        }

        $scope.isA2 = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "w"){
              return true;
            }
          }
          return false;
        }

        $scope.isA3 = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "x"){
              return true;
            }
          }
          return false;
        }

        $scope.isD2 = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "y"){
              return true;
            }
          }
          return false;
        }

        $scope.isD3 = function(liveData){
          for(var i = 0; i<liveData.length; i++){
            if(liveData[i] == "z"){
              return true;
            }
          }
          return false;
        }
      }
    })
  });
