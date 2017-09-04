'use strict';

describe('Controller: WaterpointCtrl', function () {

  // load the controller's module
  beforeEach(module('kenyaRapidApp'));

  var WaterpointCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WaterpointCtrl = $controller('WaterpointCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WaterpointCtrl.awesomeThings.length).toBe(3);
  });
});
