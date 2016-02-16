'use strict';

describe('Controller: FridgeCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var FridgeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FridgeCtrl = $controller('FridgeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FridgeCtrl.awesomeThings.length).toBe(3);
  });
});
