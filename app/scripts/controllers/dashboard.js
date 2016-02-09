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
      }
    });


  });

/*
function handleNewRoom(snap,ref,spotName){
    var room = snap.room;

    if(room == undefined){
      room = "no-room";
    }
    console.log(room);
    if($("#"+room).length > 0){
      var roomElement =  $("#"+room);
      var spotString = roomElement.find("#room-desc")[0].innerText;
      var spotNo = spotString.charAt(spotString.length - 1);
      var oldSpotNo = spotNo;
      spotNo++;
      console.log(spotNo);
      var newSpotString = spotString.replace(oldSpotNo,spotNo);
      console.log(spotString);
      roomElement.find("#room-desc")[0].innerHTML = newSpotString;
    }
    else{
      var roomElement =  $("#roomTemplate").clone();
      $(roomElement).attr("id",room);
      roomElement.find("#room-name")[0].innerHTML =  room;
      roomElement.find("#room-desc")[0].innerHTML = "Number of spots in this room = 1";
      $("#roomContainer").prepend(roomElement);
      $(roomElement).removeClass("hidden");
      tempUpdater(snap,roomElement, ref, spotName);
      lightUpdater(snap,roomElement, ref, spotName);
    }
}

//Not complete
function handleChangedRoom(snap){
    var room = snap.room;

    if(room == undefined){
      room = "no-room";
    }
    console.log(room);
    if($("#"+room).length > 0){
      var roomElement =  $("#"+room);
      var spotString = roomElement.find("#room-desc")[0].innerText;
      spotNo = spotString.charAt(spotString.length);
      spotNo++;
      spotString.charAt(spotString.length) = spotNo;
      console.log(spotString);
      roomElement.find("#room-desc")[0].innerHTML = spotString;
    }
    else{
      var roomElement =  $("#roomTemplate").clone();
      $(roomElement).attr("id",room);
      roomElement.find("#room-name")[0].innerHTML =  room;
      roomElement.find("#room-desc")[0].innerHTML = "Number of spots in this room = 1";
      $("#roomContainer").append(roomElement);
      $(roomElement).removeClass("hidden");
    }
}

function handleDeletedRoom(snap){
    var room = snap.room;
    if(room == undefined){
      room = "no-room";
    }
    console.log("Removing spot from "+room);
    if($("#"+room).length > 0){
      var roomElement =  $("#"+room);
      var spotString = roomElement.find("#room-desc")[0].innerText;
      var spotNo = spotString.charAt(spotString.length - 1);
      var oldSpotNo = spotNo;
      spotNo --;
      if(spotNo > 0){
        newSpotStirng = spotString.replace(oldSpotNo,spotNo);
        roomElement.find("#room-desc")[0].innerHTML = newSpotString;
      }else{
        $(roomElement).remove();
      }
    }
}

function tempUpdater(snap,roomElement,ref, spotName){
  var dataString = snap.liveData;
  console.log(spotName);
  var reference = ref.child(spotName);

  for(var i=0;i<dataString.length;i++){
    if(dataString.charAt(i) == "t"){
      if(snap.temp != undefined)
        $(roomElement).find('#room-temp')[0].innerHTML = snap.temp;
        // $(".progress-temp").find('#room-temp-bar').css("width", snap.temp + '%');

      reference.on("child_changed",function(snapshot){
        if(snapshot.key() == "temp" && snapshot.val() != undefined){
          $(roomElement).find('#room-temp')[0].innerHTML = snapshot.val();
          // $(".progress-temp").find('#room-temp-bar').css("width", snapshot.val() + '%');
        }
      });
    }
  }
}

function lightUpdater(snap,roomElement,ref, spotName){
  var dataString = snap.liveData;
  console.log(spotName);
  var reference = ref.child(spotName);

  for(var i=0;i<dataString.length;i++){
    if(dataString.charAt(i) == "l"){
      if(snap.light != undefined)
        $(roomElement).find('#room-light')[0].innerHTML = snap.light;
        // $(".progress-light").find('#room-light-bar').css("width", snap.light + '%');
      reference.on("child_changed",function(snapshot){
        if(snapshot.key() == "light" && snapshot.val() != undefined){
          $(roomElement).find('#room-light')[0].innerHTML = snapshot.val();
          // $(".progress-light").find('#room-light-bar').css("width", snapshot.val() + '%');
        }
      });
    }
  }
}
*/
