'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('ErrorCtrl', function ($scope)
  {
    console.log("Error", dataService.getTemp());
    $scope.errors = dataService.getTemp();
    $scope.exit = function () {
      $('#error').modal('hide');
    };
  });
