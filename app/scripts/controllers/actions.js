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
        var basesReference = userDataReference.child('bases');
        var spotsReference = userDataReference.child('spots');

        $scope.scripts = $firebaseArray(scriptReference);
        $scope.bases = $firebaseArray(basesReference);
        $scope.spots = $firebaseArray(spotsReference);

        //Script object
        $scope.scriptObj = {
          action: "",
          condition: "",
          timeout: ""
        };

        $scope.conditionConfig = {
          'id': '',
          'type': '',
          'operator': '',
          'value': ''
        };

        /*Action Templates Starts */
        $scope.actionConfig = {
          'id' : '',
          'action' : '',
          'params' : [],
          'timeout' : '',
          'sensorType' : ''
        };

        $scope.customActions = [];

        $scope.currentTemplate;

        $scope.setTemplate = function(template){
          console.log(template);
          $scope.currentTemplate = template;
        }

        $scope.sensorActions = [{
          spot : 'spot',
          action : 'BLINK',
        },{
          spot : 'spot',
          action : 'BEEP'
        },{
          spot : 'base',
          action : 'KETTLE'
        },{
          spot : 'base',
          action : 'EASYBULB'
        },{
          spot: 'base',
          action : 'NOTIFY'
        }];

        $scope.saveAction = function(actionConfig){
          var paramString;
          var paramsLength = getLength(actionConfig.action);

          console.log("Length: " + paramsLength);

          paramString = actionConfig.id + ' ';
          paramString += actionConfig.action + ' ';
          if(actionConfig.action == "NOTIFY"){
            for(var i=0;i<paramsLength;i++){
              if(actionConfig.params[i].length > 0){
                paramString += actionConfig.params[i].replace(/ /g,"_") + ' ';
              }else{
                paramString += 'NoParameterSaved ';
              }
            }
          }else{
            for(var i=0;i<paramsLength;i++){
              if(actionConfig.params[i] > 0){
                paramString += actionConfig.params[i] + ' ';
              }else{
                paramString += '0 ';
              }
            }
          }

          var timeout = actionConfig.timeout == null ? 0 : actionConfig.timeout;

          // var trimmedParams = paramString.replace(/\s+$/, ';');
          var trimmedParams = paramString.replace(/\s+$/, '');

          $scope.scriptObj.action = trimmedParams;
          $scope.scriptObj.timeout = timeout;

          //Save
          $scope.AddNewEntry($scope.scriptObj);

          //Reset
          $scope.actionConfig = {
            'id' : '',
            'action' : '',
            'params' : [],
            'timeout' : ''
          };

          function getLength(action){
            if(action.indexOf('BLINK') > -1){
              return 7;
            }else if(action.indexOf('BEEP') > -1){
              return 4;
            }else if(action.indexOf('KETTLE') > -1){
              return 2;
            }else if(action.indexOf('EASYBULB') > -1){
              return 3;
            }else if(action.indexOf('NOTIFY') > -1){
              return 2;
            }else{
              return 0;
            }
          }
        }

        /*Action Templates Ends*/

        $scope.sensorTypes = [{
          name: 'accel',
          value: 'MOTION',
          type: 'Number'
        }, {
          name: 'light',
          value: 'BRIGHTNESS',
          type: 'Number'
        }, {
          name: 'temp',
          value: 'TEMPERATURE',
          type: 'Number'
        }, {
          name: 'a2',
          value: 'A2',
          type: 'Number'
        }, {
          name: 'a3',
          value: 'A3',
          type: 'Number'
        }, {
          name: 'compass',
          value: 'COMPASS',
          type: 'Number'
        }, {
          name: 'd2',
          value: 'D2',
          type: 'Boolean'
        }, {
          name: 'infrared',
          value: 'INFRARED',
          type: 'Boolean'
        }, {
          name: 'sound',
          value: 'SOUND',
          type: 'Boolean'
        }, {
          name: 'alive',
          value: 'ALIVE',
          type: 'Boolean'
        }, {
          name: 'btn_l',
          value: 'BUTTON_LEFT',
          type: 'Boolean'
        }, {
          name: 'btn_r',
          value: 'BUTTON_RIGHT',
          type: 'Boolean'
        }, {
          name: 'Every X Minute',
          value: 'MINUTE',
          type: 'Time'
        }, {
          name: 'Every X hour',
          value: 'HOUR',
          type: 'Time'
        }, {
          name: 'Day of week',
          value: 'DAY_OF_WEEK',
          type: 'Time'
        }, {
          name: 'Day of month',
          value: 'DAY_OF_MONTH',
          type: 'Time'
        }, {
          name: 'Month',
          value: 'MONTH',
          type: 'Time'
        }, {
          name: 'Year',
          value: 'YEAR',
          type: 'Time'
        }, {
          name: 'multipress',
          value: 'MULTIPRESS',
          type: 'Long'
        }];

        $scope.currentOperator = '';

        $scope.operators = [{
          operator: '<',
          type: 'Number'
        }, {
          operator: '>',
          type: 'Number'
        }, {
          operator: 'TRUE',
          type: 'Boolean'
        }, {
          operator: 'FALSE',
          type: 'Boolean'
        },{
          operator: "==",
          type: 'Time'
        },{
          operator: '<',
          type: 'Time'
        }, {
          operator: '>',
          type: 'Time'
        }, {
          operator: '== -8',
          type: 'Long'
        }, {
          operator: '== -7',
          type: 'Long'
        }, {
          operator: '== -6',
          type: 'Long'
        }, {
          operator: '== -5',
          type: 'Long'
        }, {
          operator: '== -4',
          type: 'Long'
        }, {
          operator: '== -3',
          type: 'Long'
        }, {
          operator: '== -2',
          type: 'Long'
        }, {
          operator: '== -1',
          type: 'Long'
        }, {
          operator: '== 1',
          type: 'Long'
        }, {
          operator: '== 2',
          type: 'Long'
        }, {
          operator: '== 3',
          type: 'Long'
        }, {
          operator: '== 4',
          type: 'Long'
        }, {
          operator: '== 5',
          type: 'Long'
        }, {
          operator: '== 6',
          type: 'Long'
        }, {
          operator: '== 7',
          type: 'Long'
        }, {
          operator: '== 8',
          type: 'Long'
        } ];

        $scope.conditions = [];

        $scope.customConditions = [];

        $scope.addCustom = function(condition) {
          $scope.customConditions.push({
            condition
          });
        };

        $scope.backspace = function() {
          $scope.customConditions.pop();
        };

        $scope.add = function() {
          var config = $scope.conditionConfig;
          var operator = ''; //Clear old setting

          if (config.operator == 'TRUE') {
            $scope.conditions.push({
              'name' : config.id + ' ' + config.type
            });
          } else if (config.operator == 'FALSE') {
            operator = 'not';
            $scope.conditions.push({
              'name' : operator + ' ' + config.id + ' ' + config.type
            });
          } else {
            $scope.conditions.push({
              'name' : config.id + ' ' + config.type + ' ' + config.operator + ' ' + config.value
            });
          }

          $scope.resetConditionConfig();
        };


        $scope.saveCondition = function(customConditions) {

          if ($scope.conditions.length === 1) {
            $scope.onlyCondition = $scope.conditions[0].name;
            save($scope.onlyCondition);
            return;
          } else {
            $scope.generatedCondition = '';
            for (var i = 0; i < customConditions.length; i++) {
              $scope.generatedCondition += customConditions[i].condition + ' ';
            }
            save($scope.generatedCondition);
          }

          //Reset configuration
          reset();

          // Inner Save function starts
          function save(conditions) {
            $scope.scriptObj.condition = conditions;
          }
          // Inner save function ends

          function reset(){
            $scope.onlyCondition = '';
            $scope.generatedCondition = '';
            $scope.customConditions = [];
          }

        }

        // Add new entry to database
        $scope.AddNewEntry = function(scriptObj){

          //Firebase save API
          $scope.scripts.$add(scriptObj).then(function(scriptReference) {
            var id = scriptReference.key();
            console.log("added record with id " + id);
            $scope.scripts.$indexFor(id); // returns location in the array
          });
        }

        $scope.resetConditionConfig = function() {
          $scope.conditionConfig.id = '';
          $scope.conditionConfig.type = '';
          $scope.conditionConfig.operator = '';
          $scope.conditionConfig.value = '';
        }

        $scope.showTypes = function(spot) {

          reset();
          var obj = Object.keys(spot);
          var length = obj.length;
          var sensorType = $scope.sensorTypes;

          for (var i = 0; i < sensorType.length; i++)
            for (var j = 0; j < length; j++)
              if (sensorType[i].name == obj[j])
                sensorType[i].selected = true;

          function reset(){
            $scope.conditionConfig.type = '';
            for (var i = 0; i < $scope.sensorTypes.length; i++)
              $scope.sensorTypes[i].selected = false;
          }
        }

        $scope.setCurrentOperator = function(type) {
          reset();

          $scope.currentOperator = type;
          console.log("SET current operator: " + $scope.currentOperator);

          function reset(){
            $scope.conditionConfig.operator = '';
            $scope.conditionConfig.value = '';
          }
        }


        $scope.setStep = function(step) {
          $scope.currentStep = step;
        }

        $scope.clearSteps = function() {
          $scope.currentStep = null;
        }

        $scope.isStep = function(step) {
          return $scope.currentStep == step;
        }

        /*08-03-16 Fixes*/
        $scope.removeScript = function(id) {
          var scriptRef = scriptReference.child(id);
          scriptRef.remove();
        }
      }
    });
  })
  .directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);
