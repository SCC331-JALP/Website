'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:FridgeCtrl
 * @description
 * # FridgeCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('FridgeCtrl', function ($scope, $rootScope, $firebaseArray) {
    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    var isES = $rootScope.isES;

    var UID = authData.uid;;

    ref.onAuth(function(authData){
      if(authData){
      	var fridgeReference = ref.child('users').child(UID).child('data').child('fridge');
      	$scope.diets = $firebaseArray(fridgeReference.child('diet'));
      	$scope.fridge = $firebaseArray(fridgeReference);
      	$scope.contents = $firebaseArray(fridgeReference.child('fridgeContents'));

      	$scope.percentageDrank = function(){
	    	var percentage = (fridgeReference.liquidsConsumedToday/fridgeReference.dailyLiquidsRecommended) * 100;
	    	var returner = percentage + "%";
	    	return returner;
	    }
      }
    })

    $scope.indexToFood = function(index){
      //console.log(index);
      var indexInt = 0 + index;
      switch(indexInt){
        case 0:
          return "Vegetables";
        case 1:
          return "Fish";
        case 2:
          return "Meat";
        case 3:
          return "Chocolate";
        case 4:
          return "Pasta";
        case 5:
          return "Potatoes";
        case 6:
          return "Fruit";
        case 7:
          return "Biscuits";
      }
    }

    $scope.idToFood = function(id){
      console.log(id);
      var idInt =  parseInt(id, 10);
      console.log(idInt);
      switch(idInt){
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
  });
