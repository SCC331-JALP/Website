'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:Dashboard2Ctrl
 * @description
 * # Dashboard2Ctrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('Dashboard2Ctrl', function ($rootScope, $scope, $firebaseArray) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    var userData = $rootScope.userData;

    ref.onAuth(function(authData){
      if(authData){
        var spotReference = userData.child('spots');
        var roomReference = userData.child('rooms');

        $scope.rooms = $firebaseArray(roomReference);

      }
    })


  })

  //Sensor icon directive
  //<sicon type="NAME"></sicon>
  //Name contains: accel, battery, compass, infrared, leftbutton, light, noinfrared, nosound, rightbutton, sound, temp
  //Reference: http://stackoverflow.com/questions/36016078/angularjs-directive-accept-parameters
  .directive('sicon', function(){
    return{
      restrict: 'E',
      scope:{
        type: '=type',
        width: '=width',
        height: '=height'
      },
      template: function(ele, attrs){
         return '<object type="image/svg+xml" data="../images/icons/' + attrs.type + '.svg" style="width:'+attrs.width+'px;height:'+attrs.height+'px;" class="icon"></object>'
      }
    };
  });
