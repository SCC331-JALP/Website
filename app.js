/*************************************************************************
 * SCC331 Live Studio - Team 2 - JALP SmartLab.
 *
 *************************************************************************
 * @author
 * Anson Cheung
 *************************************************************************/

//Modules
 var app = angular.module('jalpApp', []);

 //Routes
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'   
        })
});