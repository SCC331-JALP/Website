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
        var userReference = ref.child('users').child(UID).child('data').child('rooms');

      /*  userReference.on('value', function(data){
          console.log(data.val());
        });*/

        userReference.on('child_added', function(snapshot){
            handleNewRoom(snapshot.val(), snapshot.key());
        });

        userReference.on("child_changed", function(snapshot){
          handleChangedRoom(snapshot.val(), snapshot.key());
        });

        userReference.on("child_removed", function(snapshot){
          handleDeletedRoom(snapshot.val(), snapshot.key());
        });
      }
    });


  });

function handleNewRoom(desc, name){
    name = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(name);
    console.log(desc);

    var roomElement =  $("#roomTemplate").clone();
    roomElement.find("#room-name")[0].innerHTML =  name;
    roomElement.find("#room-desc")[0].innerHTML =  desc;
    $("#roomContainer").append(roomElement);
    $(roomElement).removeClass("hidden");
}
