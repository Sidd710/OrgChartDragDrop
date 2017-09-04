'use strict';

describe('Controller: GovernanceCtrl', function () {

  // load the controller's module
  beforeEach(module('kenyaRapidApp'));

  var GovernanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GovernanceCtrl = $controller('GovernanceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GovernanceCtrl.awesomeThings.length).toBe(3);
  });
});
