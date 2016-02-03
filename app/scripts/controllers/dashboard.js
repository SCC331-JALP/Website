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

        userReference.on('child_added', function(snapshot){
            handleNewRoom(snapshot.val(), userReference,snapshot.key());
        });

        userReference.on("child_changed", function(snapshot){
          //handleChangedRoom(snapshot.val());
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedRoom(snapshot.val());
        });
      }
    });


  });

function handleNewRoom(snap,ref,spotName){
    var room = snap.room;
    
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
      tempUpdater(snap,roomElement, ref, spotName);
      lightUpdater(snap,roomElement, ref, spotName);
    }
}

//Not complete
function handleChangedRoom(snap){
    var room = snap.room;

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

function tempUpdater(snap,roomElement,ref, spotName){
  var dataString = snap.liveData;
  console.log(spotName);
  var reference = ref.child(spotName);

  for(var i=0;i<dataString.length;i++){
    if(dataString.charAt(i) == "t"){
      $(roomElement).find('#room-temp')[0].innerHTML = snap.temp;
      reference.on("child_changed",function(snapshot){
        if(snapshot.key() == "temp"){
          $(roomElement).find('#room-temp')[0].innerHTML = snapshot.val();
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
      $(roomElement).find('#room-light')[0].innerHTML = snap.light;
      reference.on("child_changed",function(snapshot){
        if(snapshot.key() == "light"){
          $(roomElement).find('#room-light')[0].innerHTML = snapshot.val();
        }
      });
    }
  }
}