'use strict';

describe('Controller: RoomCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var RoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoomCtrl = $controller('RoomCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
