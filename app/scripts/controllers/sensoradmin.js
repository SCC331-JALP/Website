'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:SensoradminCtrl
 * @description
 * # SensoradminCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('SensoradminCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    if($rootScope.logged){
      console.log("logged");
      console.log($rootScope.authData.uid);
      var USERNAME = "Povilas"//$rootScope.authData.uid; //username Initialize based on authentication
      var userReference = new Firebase("https://sunsspot.firebaseio.com/users/" + USERNAME + "/spots")


      userReference.on('child_added', function(snapshot){
          handleNewSensor(snapshot.val(), snapshot.key())
      });

      userReference.on("child_changed", function(snapshot){
        handleChangedSensor(snapshot.val(), snapshot.key())
      });

      userReference.on("child_removed", function(snapshot){
        handleDeletedSensor(snapshot.val(), snapshot.key())
      });
    }else{
      console.log("not logged");
    }

  });



function handleNewSensor(snapshot, address){

  var sensorString = "<tr id="+ address +"> <td id='name'>" + snapshot.name + "</td>" + "<td>" + snapshot.alive + "</td>" + "<td>" + snapshot.battery + "</td>";
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
  sensorString += "<td>" + snapshot.light + "</td>" + "<td>" + snapshot.temp + "</td>" + "<td>" + snapshot.compass + "</td>" + "<td>" + snapshot.infrared + "</td>" + "<td>" + snapshot.sound + "</td>" + "<td>" + address + "</td>"+"</tr>";

  $("#sensorTable").append(sensorString)
  increaseSensorCount();

}


function handleChangedSensor(snapshot, address){
  var row = $("#"+address)[0];
  console.log(snapshot);

  var sensorString = "<tr id="+ address +"> <td id='name'>" + snapshot.name + "</td>" + "<td>" + snapshot.alive + "</td>" + "<td>" + snapshot.battery + "</td>";
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
  sensorString += "<td>" + snapshot.light + "</td>" + "<td>" + snapshot.temp + "</td>" + "<td>" + snapshot.compass + "</td>" + "<td>" + snapshot.infrared + "</td>" + "<td>" + snapshot.sound + "</td>" + "<td>" + address + "</td>"+"</tr>";

  row.innerHTML = sensorString;

}

function handleDeletedSensor(snapshot, address){

  var row = $("#"+address)[0];
  row.remove();
  console.log("deleted row:" + address);
}

function increaseSensorCount(){
  $("#sensorCount")[0].innerHTML++

}
