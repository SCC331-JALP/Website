'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('DashboardCtrl', function ($scope,$rootScope, $firebaseArray) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users').child(UID).child('data').child('spots');
        var roomReference = ref.child('users').child(UID).child('data').child('rooms');

        $scope.rooms = $firebaseArray(roomReference);
        $scope.roomSensors = new Array;
      /*  userReference.on('child_added', function(snapshot){
            handleNewRoom(snapshot.val(), userReference,snapshot.key());
        });

        userReference.on("child_changed", function(snapshot){
          //handleChangedRoom(snapshot.val());
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedRoom(snapshot.val());
        });*/

        $scope.unhideForm = function(){
          $(".new-room-button").addClass("hidden");
          $("#new-room-form").removeClass('hidden');
        }
        $scope.createRoom = function(){

          var roomName = $("#newRoomName")[0].value
          var roomDesc = $("#newRoomDesc")[0].value

          if(roomName.length && roomDesc.length){
            console.log(roomName);
            console.log(roomDesc);

            $scope.rooms.$add({
              name: roomName,
              description: roomDesc
            });

            $("#newRoomName")[0].value = "";
            $("#newRoomDesc")[0].value = "";


            $("#new-room-form").addClass('hidden');

            $("#new-room-icon").removeClass("glyphicon-plus").addClass("glyphicon-ok");
            $(".new-room-button").removeClass("hidden");

            setTimeout(function(){
              $("#new-room-icon").removeClass("glyphicon-ok").addClass("glyphicon-plus");
            },1000);

          }else{ //NOTE: basic validation implemented - make it look / work better? look up bootstrap's built in form validation features for ideas.
            $(".has-error").removeClass("has-error");
            if(!roomName.length){
              $("#newRoomName").parent().addClass("has-error");
            }
            if(!roomDesc.length){
              $("#newRoomDesc").parent().addClass("has-error");
            }
          }
        }

        $scope.cancelNewRoom = function(){
          $("#newRoomName")[0].value = "";
          $("#newRoomDesc")[0].value = "";
          $("#new-room-form").addClass('hidden');
            $(".new-room-button").removeClass("hidden");
        }

        $scope.getSensors = function(roomName){


          var query = userReference.orderByChild("room").equalTo(roomName);
          $scope.roomSensors[roomName] = $firebaseArray(query);
        }


        $scope.averageValue = function(type, sensors){
            var values = new Array;

            var typeIndicator = $scope.convertTypeToIndicator(type);
          //  console.log(type + " " + typeIndicator);
            if(sensors.length){
              //console.log(sensors.length);
              for(var i =0; i < sensors.length; i++){
              //  console.log(sensors[i].liveData);
                if(sensors[i].liveData.indexOf(typeIndicator) !== -1 && sensors[i].alive){
                //  console.log("array contains temp sensor");
                  values.push(sensors[i][type])
                }
              }
              var total = 0;
              for(var j=0; j<values.length;j++){
                total += values[j];
              }
              return total/values.length;
            }
        }

        $scope.anyBoolean = function(type,sensors){
          //console.log(type);
          var typeIndicator = $scope.convertTypeToIndicator(type);
        //  console.log(type + " " + typeIndicator);

          if(sensors.length){
            //console.log(sensors.length);
            for(var i =0; i < sensors.length; i++){
            //  console.log(sensors[i].liveData);
              if(sensors[i].liveData.indexOf(typeIndicator) !== -1 && sensors[i].alive){
              //  console.log("array contains temp sensor");

                if(sensors[i][type]){
                  return true;
                }
              }
            }

          //  return true;
          }
          return false;
        }

        $scope.warningBelow = function(type,threshold,sensors){
        //  console.log(sensors);
          var addresses = new Array
          var typeIndicator = $scope.convertTypeToIndicator(type);
      //   console.log(type + " " + typeIndicator);
          if(sensors.length){
        //    console.log(sensors.length);
            for(var i =0; i < sensors.length; i++){
            //  console.log(sensors[i].liveData);
              if(sensors[i].liveData.indexOf(typeIndicator) !== -1 && sensors[i].alive){
              //  console.log("array contains temp sensor");
                if(sensors[i][type] < threshold){
                //  console.log(sensors[i].$id);
                  addresses.push(sensors[i].$id);
                }
              }
            }
          //  console.log(addresses);
            return addresses.length
          }
            return false
        }

        $scope.warningAbove = function(type,threshold,sensors){
        //  console.log(sensors);
          var addresses = new Array
          var typeIndicator = $scope.convertTypeToIndicator(type);
        //   console.log(type + " " + typeIndicator);
          if(sensors.length){
        //    console.log(sensors.length);
            for(var i =0; i < sensors.length; i++){
            //  console.log(sensors[i].liveData);
              if(sensors[i].liveData.indexOf(typeIndicator) !== -1 && sensors[i].alive){
              //  console.log("array contains temp sensor");
                if(sensors[i][type] > threshold){
                //  console.log(sensors[i].$id);
                  addresses.push(sensors[i].$id);
                }
              }
            }
          //  console.log(addresses);
            return addresses.length
          }
            return false
        }

        $scope.convertTypeToIndicator = function(type){
          switch(type){
            case "temp" :
              return "t";
            case "light" :
              return "l";
            case "compass":
              return "c";
            case "accel":
              return "a";
            case "btn_l":
              return "b";
            case "btn_r":
              return "r";
            case "sound":
              return "s";
            case "infrared":
              return "i";
            case "battery":
              return "e";
            case "a2":
              return "w";
            case "a3":
              return "x";
            case "d2":
              return "y";
            case "d3":
              return "z";
          }
        }

      } //if authData
    });


  });
