'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:SensoradminCtrl
 * @description
 * # SensoradminCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('SensoradminCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

var USERNAME = "Povilas"; //username Initialize as constant for now - implement based on authentication later on.
var userReference = new Firebase("https://sunsspot.firebaseio.com/users/" + USERNAME + "/spots")

userReference.on('child_added', function(snapshot){
    handleNewSensor(snapshot.val())
});

function handleNewSensor(snapshot){
  console.log(snapshot);
}
