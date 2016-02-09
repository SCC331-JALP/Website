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

    $scope.isDev = function(){
      if(!isDev){
        $window.location.href = '/sensor';
      }else{
        return true;
      }
    }

    $scope.getErrorCount = function(log){
      if($scope.getLength(log)){
        var length = $scope.getLength(log);
        var count = 0;
        for(var i = 0; i<length;i++){

          if(log[Object.keys(log)[i]].lvl == 2){         //log ( index ) ---> index = keys of object [i] : surely there is a better way
            count++
          }

        }

        return count;
      }

      return 0;
    }

    $scope.getCriticalCount = function(log){
      if($scope.getLength(log)){
        var length = $scope.getLength(log);
        var count = 0;
        for(var i = 0; i<length;i++){

          if(log[Object.keys(log)[i]].lvl == 3){         //log ( index ) ---> index = keys of object [i] : surely there is a better way
            count++
          }

        }

        return count;
      }

      return 0;
    }

  });
