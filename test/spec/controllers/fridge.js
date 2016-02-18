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

  it('should convert indexes to strings correctly', function(){
    expect(FridgeCtrl.indexToFood(0)).toBe("Vegetables");
    expect(FridgeCtrl.indexToFood(7)).toBe("Biscuits");
  })

  it('should calculate the correct percentage of the first number to the second', function(){
    expect(FridgeCtrl.percentageDrank(10,100)).toBe("10%");
    expect(FridgeCtrl.percentageDrank(107,100)).toBe("107%");
  })
});
