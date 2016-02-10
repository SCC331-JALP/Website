'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:ActionsCtrl
 * @description
 * # ActionsCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('ActionsCtrl', function($scope, $rootScope, $firebaseArray, $firebaseObject) {

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData) {
      if (authData) {
        var UID = authData.uid;
        var userDataReference = ref.child('users').child(UID).child('data');
        var scriptReference = userDataReference.child('scripts');
        var spotsReference = userDataReference.child('spots');

        $scope.scripts = $firebaseArray(scriptReference);
        $scope.spots = $firebaseArray(spotsReference);

        $scope.config = {
          'id' : '',
         'type' : '',
          'operator' : '',
          'value' : ''
        };

        // $scope.config = [{
        //   id : '',
        //   type : '',
        //   operator : '',
        //   value : ''
        // }];

        $scope.sensorTypes = [
          {name : 'accel'       ,value : 'MOTION'        ,type : 'Number'},
          {name : 'brightness'  ,value : 'BRIGHTNESS'    ,type : 'Number'},
          {name : 'temp'        ,value : 'TEMPERATURE'   ,type : 'Number'},
          {name : 'a2'          ,value : 'A2'            ,type : 'Number'},
          {name : 'a3'          ,value : 'A3'            ,type : 'Number'},
          {name : 'compass'     ,value : 'COMPASS'       ,type : 'Number'},
          {name : 'd2'          ,value : 'D2'            ,type : 'Boolean'},
          {name : 'infrared'    ,value : 'INFRARED'      ,type : 'Boolean'},
          {name : 'sound'       ,value : 'SOUND'         ,type : 'Boolean'},
          {name : 'alive'       ,value : 'ALIVE'         ,type : 'Boolean'},
          {name : 'btn_l'       ,value : 'BUTTON_LEFT'   ,type : 'Boolean'},
          {name : 'btn_r'       ,value : 'BUTTON_RIGHT'  ,type : 'Boolean'}
        ];

        $scope.operator = '';
        $scope.operators = [
          {operator: '<', type : 'Number'},
          {operator: '>', type : 'Number'},
          {operator: 'OR', type : 'Boolean'},
          {operator: 'AND', type : 'Boolean'},
          {operator: 'TRUE', type : 'Boolean'},
          {operator: 'FALSE', type : 'Boolean'}
        ];

        $scope.save = function(){
          var config = $scope.config;
          var operator = '';

          if(config.operator == 'TRUE'){
            operator = '';
            $scope.result = config.id + " " + config.type +  " " + operator + " " + config.value;
          }else if(config.operator == 'FALSE'){
              operator = 'not';
              $scope.result = operator + ' ' + config.id + " " + config.type;
          }


          console.log($scope.result);
        }

        $scope.showTypes = function(spot){
            $scope.config.type = '';
            $scope.clearTypes();
            var obj = Object.keys(spot);
            var length = obj.length;
            var sensorType = $scope.sensorTypes;

            for(var i=0;i<sensorType.length;i++){
                for(var j=0;j<length;j++){
                  if(sensorType[i].name == obj[j]){
                    sensorType[i].selected = true;
                  }
                }
            }
        }

        $scope.clearTypes = function(){
          for(var i=0;i<$scope.sensorTypes.length;i++){
            $scope.sensorTypes[i].selected = false;
          }
        }

        $scope.setType = function(type){
          $scope.operator = type;
          console.log("SET TYPE: " + $scope.operator);
        }

        $scope.clearType = function(operator){
          $scope.config.operator = '';
          $scope.config.value = '';
        }


        $scope.setStep = function(step) {
          $scope.currentStep = step;
        }

        $scope.clearSteps = function() {
          $scope.currentStep = null;
        }

        $scope.isStep = function(step){
          return $scope.currentStep == step;
        }
      }
    });
  });
