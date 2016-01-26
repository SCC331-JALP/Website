'use strict';

describe('Controller: AuthcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var AuthcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthcontrollerCtrl = $controller('AuthcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
