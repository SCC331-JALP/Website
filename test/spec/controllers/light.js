'use strict';

describe('Controller: LightCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var LightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LightCtrl = $controller('LightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LightCtrl.awesomeThings.length).toBe(3);
  });
});
