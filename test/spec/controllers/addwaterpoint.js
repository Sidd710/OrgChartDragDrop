'use strict';

describe('Controller: AddwaterpointCtrl', function () {

  // load the controller's module
  beforeEach(module('kenyaRapidApp'));

  var AddwaterpointCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddwaterpointCtrl = $controller('AddwaterpointCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddwaterpointCtrl.awesomeThings.length).toBe(3);
  });
});
