'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:DevCtrl
 * @description
 * # DevCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('DevCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users');

      /*  userReference.on('value', function(data){
          console.log(data.val());
        });*/

        userReference.on('child_added', function(snapshot){
            handleNewUser(snapshot.val(), snapshot.key());
        });


      }
    });

  });


function handleNewUser(snapshot, key){
  console.log(snapshot)
}
