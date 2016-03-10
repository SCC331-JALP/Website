'use strict';

/**
 * @ngdoc function
 * @name jalpWebApp.controller:LightCtrl
 * @description
 * # LightCtrl
 * Controller of the jalpWebApp
 */
angular.module('jalpWebApp')
  .controller('LightCtrl', function ($scope,$rootScope, $firebaseArray, $routeParams) {
    var ref = $rootScope.ref;
    var authData = $rootScope.authData;
    google.charts.load('current', {'packages':['corechart']});

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var readReference = ref.child('users').child(UID).child('data').child('readings');
        console.log($routeParams.spot);
        $scope.lightReadings = $firebaseArray(readReference.child($routeParams.spot).child("light"));
        console.log(readReference.child($routeParams.spot).child("light"))

        
        
        console.log("In google");

        function drawChart(){
        	$scope.lightReadings.$loaded().then(function(lightReadings){console.log("In draw");
		        var data = new google.visualization.DataTable();
				data.addColumn('string', 'Time');
				data.addColumn('number', 'Light');

				console.log(lightReadings.length)
				for(var i=0;i<$scope.lightReadings.length;i++){
					var dateInt = parseInt(lightReadings[i].$id);
					console.log(lightReadings[i].$id)
					var date = new Date(dateInt * 1000)
					var dateString = ""+date.getHours() +":" + date.getMinutes();
					data.addRow([dateString,$scope.lightReadings[i].$value])
				}

		        var options = {
		          title: 'Light Readings',
		          curveType: 'function',
		          legend: { position: 'bottom' }
		        };

		        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		        chart.draw(data, options);
	    	})
        	
	    }

	    $scope.drawLight = function(){
	        google.charts.setOnLoadCallback(drawChart);

	        console.log('in init');
	    }
	  }
    })
  });
