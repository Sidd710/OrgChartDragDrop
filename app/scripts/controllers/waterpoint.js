'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:WaterpointCtrl
 * @description
 * # WaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('WaterpointCtrl', function ($scope, apiService, dataService, leafletData, leafletMarkersHelpers)
  {
    $scope.waterpoint = dataService.getWaterPoint();
    $scope.costObj = dataService.getWaterPointCost();
    $scope.usageObj = dataService.getWaterPointUsage();

    $scope.edit = function (waterpoint) {

    };

    $scope.delete = function (waterpoint) {

    };
    console.log("Waterpoint", $scope.waterpoint);
    angular.extend($scope, {
      center: {
        lat: $scope.waterpoint.lat,
        lng: $scope.waterpoint.lon,
        zoom: 7
      },
      defaults: {
        scrollWheelZoom: false
      }
    });

    leafletData.getMap('waterpoint').then(function (map)
    {
      //console.log(map);
      leafletMarkersHelpers.resetMarkerGroups();
      renderData($scope.waterpoint);
      renderCost($scope.costObj);

    });

    function renderData(waterpoint){
      $scope.name = waterpoint.name;
      $scope.type = waterpoint.typeid;
      $scope.quality = waterpoint.waterquality === null ? 'N/A' : waterpoint.waterquality;
      $scope.quantity = waterpoint.quantity === null ? 'N/A' : waterpoint.quantity;

      $scope.meterStatus = waterpoint.meteravailability;

      $scope.management = waterpoint.managementid === null ? 'N/A': waterpoint.managementid;
      $scope.ownership = waterpoint.ownershipid === null ? 'N/A': waterpoint.ownershipid;
      $scope.servicingOrg = waterpoint.servicingorgid === null ? 'N/A': waterpoint.servicingorgid;
      $scope.responsibilityToFailure = waterpoint.responsibletoreportfailure === null ? 'N/A' : waterpoint.responsibletoreportfailure;

      $scope.org = waterpoint.ownershipid === null ? 'N/A' : waterpoint.ownershipid;
      $scope.capacity = waterpoint.capacity === null ? 'N/A': waterpoint.capacity;

      $scope.cost = 'Loading...';
      $scope.location=waterpoint.county;
      $scope.status="functional";

      /*Sensors*/
      $scope.sensorStatus = angular.equals({}, waterpoint.sensor_details) ? 'N/A' : waterpoint.sensor_details.status;
      $scope.sensorAvailability = angular.equals({}, waterpoint.sensor_details) ? 'N/A' : 'Available';
      $scope.sensorMeasurementType = angular.equals({}, waterpoint.sensor_readings) ? 'N/A' : waterpoint.sensor_readings.measurementtype;
      $scope.sensorMeasurementValue = angular.equals({}, waterpoint.sensor_readings) ? 'N/A' : waterpoint.sensor_readings.measurementvalue;
      $scope.sensorMeasurementType = angular.equals({}, waterpoint.sensor_details) ? 0 : waterpoint.sensor_details.status;

      /*Usage*/
      $scope.animals = $scope.usageObj.animals === null  ? 'N/A' : $scope.usage.animals;
      $scope.farms = $scope.usageObj.farms === null  ? 'N/A' : $scope.usage.farms;
      $scope.households = $scope.usageObj.people === null  ? 'N/A' : $scope.usage.people;
      $scope.reliability = waterpoint.reliability === null  ? 'N/A' : waterpoint.reliability;
      $scope.retrieval = waterpoint.waterretrievalmeans === null  ? 'N/A' : waterpoint.waterretrievalmeans;

      $scope.pump = '...';
      $scope.generator = '...';
      $scope.marker = [{
        lat: waterpoint.lat,
        lng: waterpoint.lon,
        compileMessage: false,
        message: waterpoint.name,
        icon: {
          iconUrl: '../images/marker-icon.png'
        }

      }];

      angular.extend($scope, {
        markers: $scope.marker
      });
      console.log("Waterpoint", waterpoint.lat, waterpoint.lon);

      //renderCost(waterpoint.id);
      communityImpressions();
    }

    function renderCost(data) {
      console.log("Cost data", data);
      /*Cost*/
      $scope.cost20l = data.costpertwentyltrs === null ? 'N/A' : data.costpertwentyltrs;
      $scope.costCow = data.dailycostpercow === null ? 'N/A' : data.dailycostpercow;
      $scope.costCamel = data.dailycostpercamel === null ? 'N/A' : data.dailycostpercamel;
      $scope.costGoat = data.dailycostpergoat === null ? 'N/A' : data.dailycostpergoat;
      $scope.costFlatRate = data.monthlyflatrate === null ? 'N/A' : data.monthlyflatrate;
    }

    function communityImpressions() {
      var ctx = document.getElementById('myChart').getContext('2d');
      Chart.defaults.global.defaultFontColor = 'black';
      Chart.defaults.global.defaultFontSize = '10';
      Chart.defaults.global.defaultFontStyle = 'normal';
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
          labels: ["Positive", "Negative"],
          datasets: [{
            backgroundColor: 'rgb(0,138,191)',
            borderColor: 'rgb(0,138,191)',
            data: [0, 0],
          }]
        },

        // Configuration options go here
        options: {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    };

  });
