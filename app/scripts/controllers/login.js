'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('LoginCtrl', function ($scope, $state, $localStorage, apiService, dataService)
  {
    /*Variables*/

    /*Get all counties in the project*/
    function getCounties(){
      apiService.counties().get({}, function (response) {
        console.log("SERVER RESPONSE: counties: ", response);
        dataService.setCounties(response);
        $localStorage.$default({
          'counties': response
        });
      }, function (error) {
      });
    }

    /*Get all water point types*/
    function getWaterPointTypes(){
      apiService.waterPointTypes().get({}, function (response) {
        console.log("SERVER RESPONSE: water point types: ", response);
        dataService.setWaterPointTypes(response);
        $localStorage.$default({
          'waterPointTypes': response
        });
      }, function (error) {

      });
    }

    /*Get population data*/
    function getPopulation(){
      apiService.population().get({}, function (response) {
        console.log("SERVER RESPONSE: Population: ", response);
        dataService.setPopulation(response);
        $localStorage.$default({
          'population': response
        });
        getWaterPointTypes();
        getCounties();
        getGeography();
        getAllWaterPoints();
        getFailureReporting();
        getServicingOrgs();
      }, function (error) {

      });
    }

    function getFailureReporting(){
      apiService.failureMgmt().get({}, function (response) {
        console.log("SERVER RESPONSE: FR: ", response);
        $localStorage.$default({
          'failureReporting': response
        });
      }, function (error) {

      });
    }

    function getServicingOrgs(){
      apiService.servicingMgmt().get({}, function (response) {
        console.log("SERVER RESPONSE: SO: ", response);
        $localStorage.$default({
          'servicingOrg': response
        });
      }, function (error) {

      });
    }

    function getGeography(){
      apiService.geography().get({}, function (response) {
        console.log("SERVER RESPONSE: Geograpy: ", response);
        dataService.setGeography(response);
        $localStorage.$default({
          'geography': response
        });
      }, function (error) {

      });
    }

    /*Get all water points*/
    function getAllWaterPoints(){
      apiService.allWaterPoints().get({},function (response)
      {
        $scope.isLoading = $scope.isLoading ? false : true;
        dataService.setWaterPoints(response);
        $state.transitionTo('main');
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.toString());
        return error;
      });
    }

    function login(user){
      $scope.isLoading = $scope.isLoading ? false : true;
      getPopulation();
    }

    $scope.loading = function () {
      return 'views/templates/loading.html';
    };

    $scope.login = function (user) {
      login(user);
      /*if (user) {
        if(user.username && user.password){
          login(user);
        }
        else {
          if (!user.username) {
            showError("No username provided");
          }
          else {
            showError("No password provided");
          }
        }
      }
      else {
        //Prompt the user for their username or password
        showError("No username or password provided");
      }*/
    };

  });
