'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('DashboardCtrl', function ($rootScope) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users').child(UID).child('data').child('spots');

      /*  userReference.on('value', function(data){
          console.log(data.val());
        });*/

        userReference.on('child_added', function(snapshot){
            handleNewRoom(snapshot.val());
        });

        userReference.on("child_changed", function(snapshot){
          handleChangedRoom(snapshot.val());
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedRoom(snapshot.val());
        });
      }
    });


  });

function handleNewRoom(snap){
    var room = snap.room;
    //name = room.charAt(0).toUpperCase() + room.slice(1);
    if(room == undefined){
      room = "no room";
    }
    console.log(room);
    if($("#"+room).length > 0){
      var roomElement =  $("#"+room);
      var spotNo = roomElement.find("#room-desc")[0].innerText;
      spotNo++;
      roomElement.find("#room-desc")[0].innerHTML = spotNo;
    }
    else{
      var roomElement =  $("#roomTemplate").clone();
      $(roomElement).attr("id",room);
      roomElement.find("#room-name")[0].innerHTML =  room;
      roomElement.find("#room-desc")[0].innerHTML = 1;
      $("#roomContainer").append(roomElement);
      $(roomElement).removeClass("hidden");
    }
}

function handleChangedRoom(snap){
    var room = snap.room;

}

function handleDeletedRoom(snap){
    var room = snap.room;
    if(room == undefined){
      room = "no room";
    }
    console.log("Removing spot from "+room);
    if($("#"+room).length > 0){
      var roomElement =  $("#"+room);
      var spotNo = roomElement.find("#room-desc")[0].innerText;
      spotNo--;
      if(spotNo > 0){
        roomElement.find("#room-desc")[0].innerHTML = spotNo;
      }else{
        $(roomElement).remove();
      }
    }
}
