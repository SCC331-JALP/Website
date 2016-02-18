'use strict';

describe('Controller: DevCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var DevCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DevCtrl = $controller('DevCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
