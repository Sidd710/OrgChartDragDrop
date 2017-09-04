'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('MainCtrl', function ($scope, $state, apiService, dataService) {

    /*Variables*/
    $scope.parent = 'dashboard';

    $state.transitionTo('main.dashboard');

    /*Navigation drawer: open and close the drawer*/
    $scope.toggleNavDrawer = function () {
      var container = $('.bmd-layout-container');

      var element = document.getElementById('hidden');
      if (typeof(element) !== 'undefined' && element !== null) {
        container.removeClass('bmd-drawer-out'); // demo only, regardless of the responsive class, we want to force it close
        document.getElementById('hidden').id = 'visible';
      }
      else {
        container.addClass('bmd-drawer-out'); // demo only, regardless of the responsive class, we want to force it close
        document.getElementById('visible').id = 'hidden';
      }
    };

    /*------------------Router fns------------------*/

    /*Route to the dashboard*/
    $scope.dashboard = function () {
      $scope.parent = 'dashboard';
      $state.transitionTo('main.dashboard');
    };

    /*Route to the map*/
    $scope.map = function () {
      $scope.parent = 'map';
      $state.transitionTo('main.map');
    };

    /*Route to the governance structure*/
    $scope.governance= function () {
      $scope.parent = 'governance';
      $state.transitionTo('main.governance');
    };

    /*Route to the water budget*/
    $scope.budget = function () {
      $scope.parent = 'budget';
      $state.transitionTo('main.budget');
    };

    $scope.acacia = function () {

    };

    $scope.sweetSense = function () {

    };

    $scope.profile = function () {
      $state.transitionTo('main.profile');
    };

    $scope.about = function () {
      $scope.parent = 'about';
      $state.transitionTo('main.about');
    };

    /*Logout from the system*/
    $scope.logout = function () {
      $state.transitionTo('login');
    };

    console.log("Error", dataService.getTemp());
    $scope.errors = dataService.getTemp();
    $scope.exit = function () {
      $('#error').modal('hide');
    };


    /*$scope.reload = function () {
      console.log("Testing...");
      $scope.$on('delete', function (event, arg) {

        console.log("Args", arg);
        $scope.deleteId = arg;
        apiService.deleteWaterPoint($scope.deleteId).delete({},function (response) {
          $scope.isLoading = $scope.isLoading ? false : true;
          console.log("Response: "+response);
          return response;
        },function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          console.log("Error", error);
          return error;
        });
      });
      $scope.isLoading = $scope.isLoading ? false : true;
    };*/

    /*$scope.view = function (data) {
      dataService.setWaterPoint(data);
      $scope.url = 'views/waterpoint.html';
    };

    $scope.addWaterPointSteps = function(){
      return $scope.stepsUrl;
    };

    /!*Error fn: show the relevant error to the user*!/
    $scope.error = "Oops! Something went wrong";
     $scope.$on('topic', function (event, arg) {
     $scope.error = arg;
     });

    $scope.waterProfile = function () {
      //console.log("Form Data: "+$scope.waterpoint.type);
      $('#step1').addClass('active');
      $('#label1').addClass('active');
      $scope.stepsUrl = 'views/add/step1.html';
    };
    $scope.location = function () {
      //console.log("Form Data: "+$scope.waterpoint.type);
      $('#step2').addClass('active');
      $('#label2').addClass('active');
      $scope.stepsUrl = 'views/add/step2.html';
    };
    $scope.infrastructure = function () {
      $('#step3').addClass('active');
      $('#label3').addClass('active');
      $scope.stepsUrl = 'views/add/step3.html';
    };
    $scope.management = function () {
      $('#step4').addClass('active');
      $('#label4').addClass('active');
      $scope.stepsUrl = 'views/add/step4.html';
    };*/
  });
