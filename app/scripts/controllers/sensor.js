'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:SensorCtrl
 * @description
 * # SensorCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('SensorCtrl', function ($scope, $rootScope, $firebaseArray) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users').child(UID).child('data').child('spots');
        var errorLogRef = ref.child('users').child(UID).child('data').child('log');
        //$scope.sensors is a synchronized variable, things change in this variable will change in firebase
        $scope.sensors = $firebaseArray(userReference);
        $scope.errors = $firebaseArray(errorLogRef);
        $scope.getTypeCount = function(){
          var info = 0;
          var warn = 0;
          var error = 0;
          var crit = 0;

          for(var i = 0; i< $scope.errors.length; i++){
            if($scope.errors[i].lvl == 0){
              info++;
            }else if($scope.errors[i].lvl == 1){
              warn++;
            }else if($scope.errors[i].lvl == 2){
              error++;
            }else if($scope.errors[i].lvl == 3){
              crit++;
            }
          }
          return {"info":info,"warning":warn,"error":error,"critical":crit}
        }
        //When 'edit' button is clicked, a copy of selected data will be stored in this variable
        $scope.selectedData = [];

        //Note: $id = sensor's address
        //When sensor address == selected data address, use 'edit' template (in sensor.html), else use 'show' template
        $scope.getTemplate = function(sensor){
          return (sensor.$id === $scope.selectedData.$id) ? 'edit' : 'show';
        };

        $scope.editSensor = function(sensor){
          $scope.selectedData = angular.copy(sensor);
        };

        $scope.cancel = function(){
          $scope.selectedData = [];
        }

        $scope.save = function(index){
          console.log('Saving sensor');

          //sensor is bind to ng-model="sensor"
          //If you want to bind a specific model, you can do
          //var sensorName = $scope.sensors[index].name
          var sensor = $scope.sensors[index];
          $scope.sensors.$save(sensor);

          $scope.cancel();
        }

        $scope.deleteError = function(error){
          console.log(error);
          $scope.errors.$remove(error)
        }

        userReference.on('child_added', function(snapshot){
            handleNewSensor(snapshot.val(), snapshot.key())
        });

        userReference.on("child_changed", function(snapshot){
          handleChangedSensor(snapshot.val(), snapshot.key());
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedSensor(snapshot.val(), snapshot.key())
        });
      }
    });

  });

function handleNewSensor(snapshot, address){
  //console.log(snapshot);
  // var sensorString = "<tr id="+ address +"> <td id='name'>" + snapshot.name + "</td>" + "<td id='alive'>" + snapshot.alive + "</td>" + "<td id='battery'>" + snapshot.battery + "</td>";

  // sensorString += "<td id='button'>"+snapshot.button+"</td>"

  // sensorString += "<td id='light'>" + snapshot.light + "</td>" + "<td id='accel'>" + snapshot.accel + "</td>" + "<td id='temp'>" + snapshot.temp + "</td>" + "<td id='compass'>" + snapshot.compass + "</td>" + "<td id='infrared'>" + snapshot.infrared + "</td>" + "<td id='sound'>" + snapshot.sound + "</td>" + "<td>" + address + "</td>"+"</tr>";

  // $("#sensorTable").append(sensorString)
  // increaseSensorCount();
  $("#"+address).addClass("success")
  setTimeout(function(){
      $("#"+address).removeClass('success');
  },1000);

}


function handleChangedSensor(snapshot, address){
  var row = $("#"+address)[0];
  var cells = $(row).children()

  cells.each(function(index, element){
    if(index < cells.length -1){ //exclude the last column from updating
      if(element.innerHTML !== ""+snapshot[$(element).attr('id')]){ //if the data on the page does not match the data in the database
      //  console.log("change detected");
        element.innerHTML = snapshot[$(element).attr('id')] //update the data

        $(element).addClass("info") //add class and then remove it after 1 second
        setTimeout(function(){
            $(element).removeClass('info');
        },1000);
      }
    }
  });

}

function handleDeletedSensor(snapshot, address){

  var row = $("#"+address)[0];

  $(row).addClass("danger")
  setTimeout(function(){
      row.remove();
  },1000);
 console.log("deleted row:" + address);

 // decrementSensorCount();
}
