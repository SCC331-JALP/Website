'use strict';

describe('Controller: SensorCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var SensorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SensorCtrl = $controller('SensorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SensorCtrl.awesomeThings.length).toBe(3);
  });
});
