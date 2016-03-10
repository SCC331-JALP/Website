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
    'LocalStorageModule',
    'firebase'
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
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/sensor', {
        templateUrl: 'views/sensor.html',
        controller: 'SensorCtrl',
        controllerAs: 'sensor'
      })
      .when('/actions', {
        templateUrl: 'views/actions.html',
        controller: 'ActionsCtrl',
        controllerAs: 'actions'
      })
      .when('/dev', {
        templateUrl: 'views/dev.html',
        controller: 'DevCtrl',
        controllerAs: 'dev'
      })
      .when('/room', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl',
        controllerAs: 'room'
      })
      .when('/fridge', {
        templateUrl: 'views/fridge.html',
        controller: 'FridgeCtrl',
        controllerAs: 'fridge'
      })
      .when('/emergency', {
        templateUrl: 'views/emergency.html',
        controller: 'EmergencyCtrl',
        controllerAs: 'emergency'
      })
      .when('/light', {
        templateUrl: 'views/light.html',
        controller: 'LightCtrl',
        controllerAs: 'light'
      })
      .otherwise({
        redirectTo: '/'
      });


  })
  .run(function($rootScope, $route, $window, $firebaseObject) {
    $rootScope.ref = new Firebase('https://sunsspot.firebaseio.com/');

    // Create a callback which logs the current auth state
    $rootScope.authDataCallback = function(authData) {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      } else {
        console.log('User is logged out');
      }
    };

    $rootScope.ref.onAuth($rootScope.authDataCallback);
    $rootScope.authData = $rootScope.ref.getAuth();
    $rootScope.logged = $rootScope.authData ? true : false;

    $rootScope.logout = function(){
      $rootScope.ref.unauth();
      $window.location.href = '/';
    };

    var ref = $rootScope.ref;
    var authData = $rootScope.authData;

    ref.onAuth(function(authData){
      if(authData){
        var UID = authData.uid;
        var userReference = ref.child('users');

        $rootScope.userProfile = authData ? $firebaseObject(userReference.child(UID)) : null;

        $rootScope.userProfile.$loaded().then(function () {
          $rootScope.isDev = ($rootScope.userProfile.access_level == 1) ? true : false;
          $rootScope.isES = ($rootScope.userProfile.access_level == 2) ? true : false;
        });
      }
    });

  });
