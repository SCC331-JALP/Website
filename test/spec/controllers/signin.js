'use strict';

describe('Controller: SigninCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var SigninCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SigninCtrl = $controller('SigninCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
