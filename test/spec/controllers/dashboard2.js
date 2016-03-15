'use strict';

describe('Controller: Dashboard2Ctrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var Dashboard2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Dashboard2Ctrl = $controller('Dashboard2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Dashboard2Ctrl.awesomeThings.length).toBe(3);
  });
});
