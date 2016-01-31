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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DevCtrl.awesomeThings.length).toBe(3);
  });
});
