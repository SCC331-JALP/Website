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
        var roomReference = ref.child('users').child(UID).child('data').child('rooms');

        //$scope.sensors is a synchronized variable, things change in this variable will change in firebase
        $scope.sensors = $firebaseArray(userReference);
        $scope.errors = $firebaseArray(errorLogRef);
        $scope.rooms = $firebaseArray(roomReference);
        $scope.displayErrors = $scope.errors;
        $scope.storedData;
        $scope.liveData;
        $scope.sensorTypes = [{
            title: 'compass',
            prefix: 'c',
          },{
            title: 'temperature',
            prefix: 't',
          },{
            title: 'light',
            prefix: 'l',
          },{
            title: 'acceleration',
            prefix: 'a',
          },{
            title: 'sound',
            prefix: 's',
          },{
            title: 'battery ',
            prefix: 'e',
          },{
            title: 'infrared',
            prefix: 'i',
          },{
            title: 'A2',
            prefix: 'w',
          },{
            title: 'A3',
            prefix: 'x',
          },{
            title: 'D2',
            prefix: 'y',
          },{
            title: 'D3',
            prefix: 'z',
          },{
            title: 'on/off',
            prefix: 'o',
          },{
            title: 'Right Button',
            prefix: 'r',
          },{
            title: 'multipress',
            prefix: 'm',
          },{
            title: 'Left Button',
            prefix: 'b'
          }];

        $scope.sensorTypesLive = angular.copy($scope.sensorTypes);

        $scope.clearStored = function(){
          for(var i = 0; i < $scope.sensorTypes.length; i++){
            $scope.sensorTypes[i].selected = false;
          }
        }
        $scope.clearLive = function(){
          for(var i = 0; i < $scope.sensorTypesLive.length; i++){
            $scope.sensorTypesLive[i].selected = false;
          }
        }

        $scope.initStoredData = function(fbStoredData){
          console.log('initDataStored called.');
          $scope.storedData = '';
          $scope.clearStored();
          $scope.storedData = fbStoredData;
          for(var i = 0; i < $scope.sensorTypes.length; i++){

            // //If firebase stored data string contains sensor type prefix
            // if(fbStoredData.indexOf($scope.sensorTypes[i].prefix) !== -1){
            //     $scope.sensorTypes[i].selected = true;
            // }
            if($scope.liveData.indexOf($scope.sensorTypes[i].prefix) !== -1){
                $scope.sensorTypes[i].enabled = true;
            }


          }
        }

        $scope.initLiveData = function(fbLiveData){
          console.log('initLiveData called.');
          $scope.liveData = '';
          $scope.clearLive();
          $scope.liveData = fbLiveData;
          for(var i = 0; i < $scope.sensorTypesLive.length; i++){
            if(fbLiveData.indexOf($scope.sensorTypesLive[i].prefix) !== -1){
             $scope.sensorTypesLive[i].selected = true;
            }
          }
        }

        $scope.$watch('sensorTypes', function() {
          $scope.storedData = '';
          for(var i = 0; i < $scope.sensorTypes.length; i++) {
              if($scope.sensorTypes[i].selected === true){
                  $scope.storedData += $scope.sensorTypes[i].prefix;
              }
          }
        }, true);

        $scope.$watch('sensorTypesLive', function() {
          $scope.liveData = '';
          for(var i = 0; i < $scope.sensorTypesLive.length; i++) {
              if($scope.sensorTypesLive[i].selected === true){
                  $scope.liveData += $scope.sensorTypesLive[i].prefix;
                  $scope.sensorTypes[i].enabled = true;
              }else{
                $scope.sensorTypes[i].enabled = false;
              }
          }
        }, true);

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


        $scope.filterErrors = function(type){
          console.log(type);
          console.log($scope.errors);


            if(type == 'info'){
              $scope.displayErrors =  $scope.errors.filter(function(er){
                  return er.lvl == 0;
                });
            }else if(type == 'warning'){
              $scope.displayErrors =  $scope.errors.filter(function(er){
                  return er.lvl == 1;
                });
            }else if(type == 'error'){
              $scope.displayErrors =  $scope.errors.filter(function(er){
                  return er.lvl == 2;
                });
            }else if(type == 'critical'){
              $scope.displayErrors =  $scope.errors.filter(function(er){
                  return er.lvl == 3;
                });
            }else if(type == 'clear'){
              $scope.displayErrors =  $scope.errors;
            }

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

        $scope.save = function(index, storedData, liveData){
          console.log('Saving sensor');
          $scope.sensors[index].storedData = storedData;
          $scope.sensors[index].liveData = liveData;
          console.log(storedData);
          var sensor = $scope.sensors[index];
          $scope.sensors.$save(sensor);
          $scope.cancel();
        }

        $scope.sensorModal = function(index){
          $("#spot-id")[0].value = ""+index;
          $("#sensorModal").modal();
        }

        $scope.delete = function(){

          var sensor = $scope.sensors[$("#spot-id")[0].value];
          $scope.sensors.$remove(sensor);
          $scope.cancel();
        }

        $scope.deleteError = function(error){
          console.log(  $("#"+error.$id));
          $("#"+error.$id).slideUp(1000,function(){
             $scope.errors.$remove(error)
          })

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

        $(element).addClass("info animated zoomIn") //add class and then remove it after 1 second
        setTimeout(function(){
            $(element).removeClass('info animated zoomIn');
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

}
