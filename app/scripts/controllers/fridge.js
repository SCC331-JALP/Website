'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:FridgeCtrl
 * @description
 * # FridgeCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('FridgeCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseObject) {
    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    var isES = $rootScope.isES;

    var UID = authData.uid;;

    ref.onAuth(function(authData){
      if(authData){
      	var fridgeReference = ref.child('users').child(UID).child('data').child('fridge');
      	$scope.diets = $firebaseArray(fridgeReference.child('diet'));
      	$scope.fridgeTest = $firebaseObject(fridgeReference);
      	$scope.contents = $firebaseArray(fridgeReference.child('fridgeContents'));
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

    $scope.percentageDrank = function(drank,toDrink){
	    	var percentage = (drank/toDrink) * 100;
	    	percentage = Math.round(percentage);
	    	var returner = percentage + "%";
	    	return returner;
	    }

	$scope.getLength = function(content){
    	var food = $scope.indexToFood(parseInt(content) - 1);
    
      var childObject;
      for(var child in $scope.contents){

        if($scope.contents[child].$id == content){
          childObject = $scope.contents[child];
        }
      }

      return Object.keys(childObject).length - 3;
    }
  });
