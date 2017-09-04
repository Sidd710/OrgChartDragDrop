/**
 * Created by Violette Ogega on 8/29/2017.
 */

'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('Step4Ctrl', function ($state, $scope, $localStorage, apiService, dataService)
  {
    /*Variables*/
    $scope.waterpoint = dataService.getWaterPoint();
    $scope.cost = dataService.getWaterPointCost();
    $scope.failures = $localStorage.failureReporting;
    $scope.servicing = $localStorage.servicingOrg;

    console.log("Waterpoint", $scope.waterpoint);

    function getWaterPoint(wp)
    {
      var wpoint = new Array();
      var data = new Array();

      if(wp === null){

      }else{
        data.push({
          "web_page_load": "false",
          "name": wp.name === null ? "" : wp.name,
          "lat": wp.lat === null ? "" : wp.lat,
          "lon": wp.lon === null ? "" : wp.lon,
          "town": wp.town === null ? "" : wp.town,
          "depth": wp.depth === null ? "" : wp.depth,
          "capacity": wp.capacity === null ? "" : wp.capacity,
          "yield": "",
          "quantity": "",
          "water_quality": "",
          "telecom_carrier": "",
          "yoc": wp.yearofconstruction === null ? "" : wp.yearofconstruction,
          "rural_or_urban": "",
          "distance_from_cc": "0",
          "water_retrieval_means": [],
          "meter_availability": "",
          "reliability": "",
          "county": wp.county === null ? "" : wp.county,
          "type": wp.typeid === null ? "" : wp.typeid,
          "ward": wp.ward === null ? "" : wp.ward,
          "failure_reporter": wp.responsibletoreportfailure === null ? "" : wp.responsibletoreportfailure,
          "funding_org": "",//wp.fundingorgid === null ? "" : wp.fundingorgid,
          "owner": "",//wp.ownershipid === null ? "" : wp.ownershipid,
          "management": "",//wp.managementid === null ? "" : wp.managementid,
          "servicing_org": wp.servicingorgid === null ? "" : wp.servicingorgid
        });
        wpoint.push({"water_point": data[0]});
      }
      return angular.toJson(wpoint[0]);
    }

    function getCost(cost, id){
      var obj = new Array();
      var data = new Array();

      if(cost === null){

      }else{
        data.push({
          "cost_per_twenty_litres": cost.costpertwentyltrs === null ? "" : cost.costpertwentyltrs,
          "daily_cost_per_goat": cost.dailycostpergoat === null ? "" : cost.dailycostpergoat,
          "daily_cost_per_cow": cost.dailycostpercow === null ? "" : cost.dailycostpercow,
          "daily_cost_per_camel": cost.dailycostpercamel === null ? "" : cost.dailycostpercamel,
          "monthly_flat_rate": cost.monthlyflatrate === null ? "" : cost.monthlyflatrate,
          "date": 1284101485,
          "water_point_id": id
        });

        obj.push({"cost": data[0]});
      }
      return angular.toJson(obj[0]);
    }

    function getUsage(usage, id){
      var obj = new Array();
      var data = new Array();

      if(usage === null){

      }else{
        data.push({
          "people": usage.people === null ? "" : usage.people,
          "animals": usage.animals === null ? "" : usage.animals,
          "farms": usage.farms === null ? "" : usage.farms,
          "date":1284101485, //todo edit with Date.now()
          "water_point_id":id
        });

        obj.push({"usage": data[0]});
      }
      return angular.toJson(obj[0]);
    }

    function addWaterPoint(wp){
      console.log("Waterpoint", wp);

      apiService.addWaterPoint().save(wp,function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Response: "+angular.toJson(response));
        var usage = getUsage($localStorage.newWPUsage, response.id);
        console.log("Usage", usage);
        addWaterPointUsage(usage);

        return response;
      },function (error) {
        return error;
      });
    }

    function addWaterPointUsage(usage){
      apiService.addWaterPointUsage().save(usage,function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Response: "+angular.toJson(response));
        var cost = getCost($scope.cost, response.waterpointid);
        console.log("Cost", cost);
        addWaterPointCost(cost);
        return response;
      },function (error) {
        return error;
      });
    }

    function addWaterPointCost(cost){
      apiService.addWaterPointCost().save(cost,function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Response: "+angular.toJson(response));
        $state.transitionTo('main.dashboard');
        return response;
      },function (error) {
        return error;
      });
    }

    $scope.back = function () {
      $state.transitionTo('main.add.step3');
    };
    $scope.finish = function () {
      var newWp = getWaterPoint($scope.waterpoint);
      addWaterPoint(newWp);
    };

    $('#step4').addClass('active');
    $('#label4').addClass('active');
  });

