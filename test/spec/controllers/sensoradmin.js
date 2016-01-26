'use strict';

describe('Controller: SensoradminCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var SensoradminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SensoradminCtrl = $controller('SensoradminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SensoradminCtrl.awesomeThings.length).toBe(3);
  });
});
