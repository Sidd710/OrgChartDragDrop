'use strict';

describe('Controller: WaterbudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('kenyaRapidApp'));

  var WaterbudgetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WaterbudgetCtrl = $controller('WaterbudgetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WaterbudgetCtrl.awesomeThings.length).toBe(3);
  });
});
