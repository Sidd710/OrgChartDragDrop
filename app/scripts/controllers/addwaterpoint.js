'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('AddwaterpointCtrl', function ($state, $scope, dataService)
  {
    $scope.parent = 'add';
    $scope.waterpoint = dataService.getWaterPoint();

    if(angular.isUndefined($scope.waterpoint) || $scope.waterpoint === null){
      $scope.crud = 'Add';
    }
    else{
      $scope.crud = 'Edit';
    }
    $state.transitionTo('main.add.step1');
  });
