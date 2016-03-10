'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:LightCtrl
 * @description
 * # LightCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('TempCtrl', function ($scope,$rootScope, $firebaseArray, $routeParams) {
    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    google.charts.load('current', {'packages':['corechart']});

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var readReference = ref.child('users').child(UID).child('data').child('readings');
        console.log($routeParams.spot);
        $scope.tempReadings = $firebaseArray(readReference.child($routeParams.spot).child("temp"));
        console.log(readReference.child($routeParams.spot).child("temp"));

        
        
        console.log("In google");

        function drawTemp(){
        	$scope.tempReadings.$loaded().then(function(tempReadings){console.log("In draw");
		        var data = new google.visualization.DataTable();
				data.addColumn('string', 'Time');
				data.addColumn('number', 'Temperature');

				console.log(tempReadings.length)
				for(var i=0;i<$scope.tempReadings.length;i++){
					var dateInt = parseInt(tempReadings[i].$id);
					console.log(tempReadings[i].$id)
					var date = new Date(dateInt * 1000)
					var dateString = ""+date.getHours() +":" + date.getMinutes();
					data.addRow([dateString,$scope.tempReadings[i].$value])
				}

		        var options = {
		          title: 'Temperature Readings of ' + $routeParams.spot,
		          curveType: 'function',
		          legend: { position: 'bottom' }
		        };

		        var chart = new google.visualization.LineChart(document.getElementById('temp_chart'));

		        chart.draw(data, options);
	    	})
        	
	    }

	    $scope.drawTemp = function(){
	    	console.log('in init');
	        google.charts.setOnLoadCallback(drawTemp);

	        
	    }
	  }
    })
  });
