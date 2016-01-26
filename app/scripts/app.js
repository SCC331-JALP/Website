'use strict';

/**
 * @ngdoc overview
 * @name jalpWebApp
 * @description
 * # jalpWebApp
 *
 * Main module of the application.
 */
angular
  .module('jalpWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'AuthcontrollerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      
  })
  .run(function($rootScope) {
    $rootScope.appName = 'JALP SmartLab';
  });
