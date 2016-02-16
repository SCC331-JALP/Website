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

    $scope.indexToFood = function(index){
      //console.log(index);
      switch(index){
        case 1:
          return "Vegetables";
        case 2:
          return "Fish";
        case 3:
          return "Meat";
        case 4:
          return "Chocolate";
        case 5:
          return "Pasta";
        case 6:
          return "Potatoes";
        case 7:
          return "Fruit";
        case 8:
          return "Biscuits";
        }
      }

      $scope.increasePortion = function(user,index){

        var current = user.data.fridge.diet[index]
        user.data.fridge.diet[index] = current + 1;
        users.$save(user);


      }
      $scope.decreasePortion = function(user,index){
        var current = user.data.fridge.diet[index]
        user.data.fridge.diet[index] = current - 1;
        users.$save(user);
      }
  });
