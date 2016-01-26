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

var sensorString = "<tr> <td>" + snapshot.name + "</td>" + "<td>" + snapshot.alive + "</td>" + "<td>" + snapshot.battery + "</td>";

if(snapshot.button == 0){
  sensorString += "<td> None </td>"
}else if(snapshot.button == 1){
  sensorString += "<td> 1 pressed </td>"
}else if(snapshot.button == 2){
  sensorString += "<td> 1 up </td>"
}else if(snapshot.button == 3){
  sensorString += "<td> 2 pressed </td>"
}else if(snapshot.button == 4){
  sensorString += "<td> 2 up </td>"
}

sensorString += "<td>" + snapshot.light + "</td>" + "<td>" + snapshot.temp + "</td>" + "<td>" + snapshot.compass + "</td>" + "<td>" + snapshot.infrared + "</td>" + "<td>" + snapshot.sound + "</td>" + "</tr>";


  $("#sensorTable").append(sensorString)




  increaseSensorCount();

}


function increaseSensorCount(){
  $("#sensorCount")[0].innerHTML++

}
