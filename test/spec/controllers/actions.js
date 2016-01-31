'use strict';

describe('Controller: ActionsCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var ActionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionsCtrl = $controller('ActionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActionsCtrl.awesomeThings.length).toBe(3);
  });
});
