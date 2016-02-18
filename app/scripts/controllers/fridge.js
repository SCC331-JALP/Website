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
      //recieve id as parameter

      var childObject;
      for(var child in $scope.contents){ //for every child in fridgeContents

        if($scope.contents[child].$id == content){ //if the child's id maches the parameter id
          childObject = $scope.contents[child]; //store the child in a temp object
        }
      }

      return Object.keys(childObject).length - 3; //get a list of keys inside the object, then count the length, and decrement by 3 to account for things js add to ovjects 
    }
  });
