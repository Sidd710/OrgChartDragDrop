'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('Step3Ctrl', function ($state, $scope, $localStorage, dataService)
  {
    /*Variables*/
    $scope.waterpoint = dataService.getWaterPoint();

    console.log("waterpoint", $scope.waterpoint);

    $scope.back = function () {
      $state.transitionTo('main.add.step2');
    };
    $scope.next = function () {
      dataService.setWaterPoint($scope.waterpoint);
      $localStorage.$default({
        'newWaterPoint': $scope.waterpoint
      });
      $state.transitionTo('main.add.step4');
    };

    $('#step3').addClass('active');
    $('#label3').addClass('active');
  });
