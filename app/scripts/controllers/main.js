'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    // $scope.todos = [];

    var todoInStore = localStorageService.get('todos');

    $scope.todos = todoInStore || [];

    $scope.$watch('todos', function(){
        localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function() {
        $scope.todos.push($scope.todo);
        $scope.todo = '';
    };

    $scope.removeTodo = function(index) {
        $scope.todos.splice(index, 1);
    };
  });