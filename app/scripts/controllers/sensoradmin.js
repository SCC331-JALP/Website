'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:SensoradminCtrl
 * @description
 * # SensoradminCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('SensoradminCtrl', function ($rootScope, $firebaseObject) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users').child(UID).child('data').child('spots');
        
        userReference.on('value', function(data){
          console.log(data.val());
        });

        userReference.on('child_added', function(snapshot){
            handleNewSensor(snapshot.val(), snapshot.key())
        });

        userReference.on("child_changed", function(snapshot){
          handleChangedSensor(snapshot.val(), snapshot.key())
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedSensor(snapshot.val(), snapshot.key())
        });
      }
    });
      

  });




function handleNewSensor(snapshot, address){
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

  $("#sensorTable").append(sensorString)
  increaseSensorCount();
  $("#"+address).addClass("success")
  setTimeout(function(){
      $("#"+address).removeClass('success');
  },1000);

}


function handleChangedSensor(snapshot, address){
  var row = $("#"+address)[0];
  //  console.log(snapshot);

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

  $(row).addClass("info")
  setTimeout(function(){
      $(row).removeClass('info');
  },1000);
}

function handleDeletedSensor(snapshot, address){

  var row = $("#"+address)[0];

  $(row).addClass("danger")
  setTimeout(function(){
      row.remove();
  },1000);
 console.log("deleted row:" + address);
}

function increaseSensorCount(){
  $("#sensorCount")[0].innerHTML++

}
