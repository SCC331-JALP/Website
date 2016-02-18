'use strict';

describe('Controller: EmergencyCtrl', function () {

  // load the controller's module
  beforeEach(module('jalpWebApp'));

  var EmergencyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmergencyCtrl = $controller('EmergencyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


  it('should convert indexes to strings correctly', function(){
    expect(EmergencyCtrl.indexToFood(1)).toBe("Vegetables");
    expect(EmergencyCtrl.indexToFood(8)).toBe("Biscuits");
  })
});
