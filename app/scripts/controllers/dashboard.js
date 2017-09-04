'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('DashboardCtrl', function ($state, $scope, $timeout, $q, $http, $rootScope, $localStorage,
                                         apiService, dataService, mapService, DTColumnBuilder,
                                         DTOptionsBuilder, leafletData, leafletBoundsHelpers, leafletMarkersHelpers)
  {
    /*Variables*/
    $scope.table = [];
    $scope.hasCountyFilter = false;
    $scope.hasTypeFilter = false;
    $scope.iframeHeight = $(window).height();
    $scope.county = 'All (Counties)';
    $scope.waterpoint = 'All (Water Points)';
    $scope.counties = $localStorage.counties;
    $scope.waterPointTypes = $localStorage.waterPointTypes;
    $scope.population = $localStorage.population;

    leafletData.getMap('dashboard').then(function (map)
    {
      leafletMarkersHelpers.resetMarkerGroups();
    });

    /*Functions*/

    function initializeStylings() {
      if($scope.iframeHeight < 900){
        $scope.mapHeight = 450;
        $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('lengthMenu', [5, 10, 100,150])
          .withOption('deferRender', true);
      }
      else{
        $scope.mapHeight = 690;
        $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('deferRender', true);
      }

      $scope.loading = function () {
        return 'views/templates/loading.html';
      };
    }

    function initializeMap()
    {
      angular.extend($scope, {
        bounds: mapService.kenya.bounds,
        center: {
        },
        defaults: {
          scrollWheelZoom: false
        }
      });
    }

    //Get all water points for all the counties
    function renderData(data){
      var markers = [];
      var counter = 0;
      var count = 0;
      $scope.table.length = 0;
      $scope.waterPointsData = data;
      $scope.noOfWaterPoints = $scope.waterPointsData.length;
      $scope.popn = getPopulationPerCounty($scope.county);

      $scope.waterPointsData.forEach(function (waterpoint)
      {
        if(angular.equals({}, waterpoint.operational_status))
        {
          count++;
        }
        else{
          if(waterpoint.operational_status.waterpointstatus.trim().toLowerCase() === 'functional' ||
            waterpoint.operational_status.waterpointstatus.trim().toLowerCase() === 'funtional'){
            counter++;
          }
        }
        markers.push(waterMarkers(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
        $scope.table.push({
          id: waterpoint.id,
          name: waterpoint.name,
          type: waterpoint.typeid.toLowerCase() === 'micro water treatment plant' ? 'MWTP': waterpoint.typeid,
          county: waterpoint.county,
          yoc: waterpoint.yearofconstruction=== null ? 'N/A' : waterpoint.yearofconstruction,
          status: angular.equals({}, waterpoint.operational_status) ? 'N/A' : waterpoint.operational_status.waterpointstatus,
          sensors: angular.equals({}, waterpoint.sensor_details) ? 'N/A' : 'Available',
          data: waterpoint
        });
      });

      $scope.noOfFunctionalWaterPoints = counter;
      $scope.noOfNonFunctionalWaterPoints = $scope.noOfWaterPoints - ($scope.noOfFunctionalWaterPoints + count);
      $scope.unknownWaterPoints = $scope.noOfWaterPoints - $scope.noOfFunctionalWaterPoints - $scope.noOfNonFunctionalWaterPoints;
      $scope.markersData = markers;
      angular.extend($scope, {
        markers: $scope.markersData
      });
    }

    function waterMarkers(id, lat, lng, title, url, data)
    {
      var marker = {
        group: data.county,
        lat: lat,
        lng: lng,
        compileMessage: false,
        message: title,
        icon: {
          iconUrl: '../images/marker-icon.png'
        }

      };
      return marker;
    }

    function getAllWaterPoints(){
      var data = dataService.getWaterPoints();
      console.log("Data", data.length);
      if(data.length === 0){
        $scope.isLoading = $scope.isLoading ? false : true;
        apiService.allWaterPoints().get({},function (response) {
          $scope.isLoading = $scope.isLoading ? false : true;
          $scope.hasCountyFilter = false;
          $scope.hasTypeFilter = false;
          //renderMarkers(success);
          renderData(response);
          return response;
        },function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          console.log("Error", error.toString());
          return error;
        });
      }
      else{
        renderData(data);
      }
    }

    function getWaterPointsOfCounty(county)
    {
      $scope.county = county;
      if(county === 'all (counties)')
      {
        $scope.county = 'All (Counties)';
        county = '';
      }
      console.log("County is "+county);
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.waterPointsPerCounty(county).get({},function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        $scope.hasCountyFilter = true;
        renderData(response);
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.toString());
        return error;
      });
    }

    function getWaterPointsOfType(type)
    {
      $scope.waterpoint = type;
      if(type === 'all (water points)'){
        $scope.waterpoint = 'All (Water Points)';
        type = '';
      }
      console.log("Type is "+type);
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.waterPointsPerType(type).get({},function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        $scope.hasTypeFilter = true;
        renderData(response);
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.toString());
        return error;
      });
    }

    function getWaterPointsOfTypeAndCounty(type, county)
    {
      console.log("Type is "+type+"& the county is "+county);
      $scope.waterpoint = type;
      $scope.county = county;

      if(type === 'all (water points)'){
        $scope.waterpoint = 'All (Water Points)';
        type = '';
      }

      if(county === 'all (counties)')
      {
        $scope.county = 'All (Counties)';
        county = '';
      }
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.waterPointsPerTypeCounty(type, county).get({},function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        $scope.hasCountyFilter = true;
        $scope.hasTypeFilter = true;
        renderData(response);
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.toString());
        return error;
      });
    }

    function getPopulation()
    {
      console.log("Population Obj", $scope.population);
      $scope.totalPopulation = 0;
      $scope.garissaPopn = 0;
      $scope.marsabitPopn = 0;
      $scope.wajirPopn = 0;
      $scope.isioloPopn = 0;


      if(!angular.isUndefined($scope.population)){
        $scope.population.forEach(function (record)
        {
          $scope.totalPopulation += record.population;
          switch (record.county){
            case 'Garissa':
              $scope.garissaPopn = record.population;
              break;
            case 'Marsabit':
              $scope.marsabitPopn = record.population;
              break;
            case 'Turkana':
              $scope.turkanaPopn = record.population;
              break;
            case 'Wajir':
              $scope.wajirPopn = record.population;
              break;
            case 'Isiolo':
              $scope.isioloPopn = record.population;
              break;
            default:
              break;

          }
        });
      }
      else{
        console.log("Popn is empty");
        //TODO: Do a network call
      }
    }

    function getPopulationPerCounty(county){
      switch (county) {
        case 'garissa':
          return $scope.garissaPopn;
        case 'marsabit':
          return $scope.marsabitPopn;
        case 'turkana':
          return $scope.turkanaPopn;
        case 'wajir':
          return $scope.wajirPopn;
        case 'isiolo':
          return $scope.isioloPopn;
        default:
          return $scope.totalPopulation;
      }
    }

    function getWaterPointCost(id,type) {
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.waterPointCost(id).get({},function (response) {
        console.log("/data/cost/"+id + ": "+angular.toJson(response));
        dataService.setWaterPointCost(response[0]);
        getWaterPointLandmark(id, type);
      },function (error) {
      });
    }

    function getWaterPointLandmark(id, type) {
      apiService.waterPointLandmarks(id).get({},function (response) {
        console.log("/data/landmark/"+id + ": "+angular.toJson(response));
        getWaterPointUsage(id, type);
        dataService.setWaterPointLandmark(response[0]);
      },function (error) {
      });
    }

    function getWaterPointUsage(id, type) {
      apiService.waterPointUsage(id).get({},function (response) {
        console.log("/data/usage/"+id + ": "+angular.toJson(response));
        $scope.isLoading = $scope.isLoading ? false : true;
        dataService.setWaterPointUsage(response[0]);
        transition(type);
      },function (error) {
      });
    }

    function transition(type){
      switch(type){
        case 'edit':
          $state.transitionTo('main.add');
          break;
        case 'view':
          $state.transitionTo('main.waterpoint');
          break;
        default:
          break;
      }
    }

    $scope.loading = function () {
      return 'views/templates/loading.html';
    };

    $scope.filter = function (id, filter) {
      var filter = filter + '';

      if($scope.hasCountyFilter && $scope.hasTypeFilter)
      {
        console.log("Test1");
        switch (id)
        {
          case 'type':
            getWaterPointsOfTypeAndCounty(filter.toLowerCase(), $scope.county);
            break;
          case 'county':
            getWaterPointsOfTypeAndCounty($scope.waterpoint, filter.toLowerCase());
            break;
          default:
            break;
        }
      }
      else if($scope.hasCountyFilter && !$scope.hasTypeFilter)
      {
        console.log("Test2 ", id);
        console.log("Test2 ", filter);
        switch (id)
        {
          case 'type':
            getWaterPointsOfTypeAndCounty(filter.toLowerCase(), $scope.county);
            break;
          case 'county':
            getWaterPointsOfCounty(filter.toLowerCase());
            break;
          default:
            break;
        }
      }
      else if(!$scope.hasCountyFilter && $scope.hasTypeFilter)
      {
        console.log("Test3");
        switch (id)
        {
          case 'type':
            getWaterPointsOfType(filter.toLowerCase());
            break;
          case 'county':
            getWaterPointsOfTypeAndCounty($scope.waterpoint, filter.toLowerCase());
            break;
          default:
            break;
        }
      }
      else{
        console.log("Test4");
        switch (id)
        {
          case 'type':
            getWaterPointsOfType(filter.toLowerCase());
            break;
          case 'county':
            //getPopulationPerCounty(filter.toLowerCase());
            getWaterPointsOfCounty(filter.toLowerCase());
            break;
          default:
            break;
        }
      }

      if(id === 'county'){
         switch(filter.toLowerCase()){
         case 'garissa':
         $scope.bounds = mapService.garissa.bounds;
         break;
         case 'marsabit':
         $scope.bounds = mapService.marsabit.bounds;
         break;
         case 'turkana':
         $scope.bounds = mapService.turkana.bounds;
         break;
         case 'wajir':
         $scope.bounds = mapService.wajir.bounds;
         break;
         case 'isiolo':
         $scope.bounds = mapService.isiolo.bounds;
         break;
         default:
         $scope.bounds = mapService.kenya.bounds;
         break;
         }
      }
    };

    $scope.addWaterPoint = function () {
      dataService.setWaterPoint(null);
      $state.transitionTo('main.add');
    };

    $scope.view = function (data) {
      dataService.setWaterPoint(data);
      getWaterPointCost(data.id, 'view');
    };

    $scope.edit = function (data) {
      dataService.setWaterPoint(data);
      getWaterPointCost(data.id, 'edit');
    };

    $scope.delete = function (id) {
      console.log(id);
      dataService.setTemp(id);
      $rootScope.$broadcast('delete', {id:id});
      $('#delete').modal('show');

    };

    $scope.reload = function () {
      console.log("Testing...", dataService.getTemp());
      var id = dataService.getTemp();

      var obj = {
        "water_point_id":{"id": id}
      };

      var x = angular.toJson(obj);
      console.log("Delete", angular.toJson(obj));
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.deleteWaterPoint().remove(x, function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Response: "+response);
        $state.transitionTo('main.dashboard');
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.statusText);
        dataService.setTemp(error.statusText);
        $('#delete').modal('hide');
        $('#error').modal('show');
        return error;
      });
      $scope.isLoading = $scope.isLoading ? false : true;
    };

    /*$scope.reload = function (id) {

      $scope.error = "Oops! Something went wrong";
      $scope.$on('delete', function (event, arg) {
        console.log("Args", arg);
        $scope.deleteId = arg;
      });
      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.deleteWaterPoint($scope.deleteId).delete({},function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Response: "+response);
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error);
        return error;
      });
    };*/

    initializeStylings();
    initializeMap();
    getPopulation();
    getAllWaterPoints();


    // apiService.allWaterPointsPromise().then(function(data){
    //   console.log("Data", data);
    // });
    /*/!*Variables*!/
    $scope.stepsUrl = 'views/add/step1.html';
    $scope.isLoading = false;
    $scope.table = [];
    $scope.iframeHeight = $(window).height();

    if($scope.iframeHeight < 900){
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('lengthMenu', [5, 10, 100,150])
        .withOption('deferRender', true);
    }
    else{
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('deferRender', true);
    }

    $scope.loading = function () {
      return 'views/templates/loading.html';
    };

    $scope.initialize = function (county) {
      console.log("Calling...");

      if(county === null){
        $scope.county = 'All (Counties)';
        $scope.waterpoint = 'All (Water Points)';




      }
      else {
        $scope.county = county;
        $scope.waterpoint = 'All (Water Points)';

        $scope.isLoading = $scope.isLoading ? false : true;
        apiService.allWaterPoints().get({},function (response) {
          $scope.isLoading = $scope.isLoading ? false : true;
          //renderMarkers(success);
          renderData(response);
          return response;
        },function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          console.log("Error", error.toString());
          $('#error').modal('show');
          $rootScope.$broadcast('topic', "Server responded with an error");
          return error;
        });
        /!*renderTable(countyDataPromise);*!/
      }
    };

    /!*$scope.initialise = function(county){
      if(county === null){
        $scope.county = 'All (Counties)';
        $scope.waterpoint = 'All (Water Points)';

        $scope.isLoading = $scope.isLoading ? false : true;
        var dataPromise = apiService.allWaterPointsPromise().then(function (success)
        {
          $scope.isLoading = $scope.isLoading ? false : true;
          renderMarkers(success);
          return success;

        },function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          return error;

        });
        renderTable(dataPromise);
      }
      else{
        $scope.county = county;
        $scope.waterpoint = 'All (Water Points)';

        $scope.isLoading = $scope.isLoading ? false : true;
        var countyDataPromise = apiService.waterPointsPromise(county).then(function (success)
        {
          $scope.isLoading = $scope.isLoading ? false : true;
          console.log("Water points per county", success);
          renderMarkers(success);
          return success;
        },function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          return error;

        });
        renderTable(countyDataPromise);
      }
    };*!/

    $scope.initialize(null);

    $scope.addWaterPoint = function () {
      console.log("Opens Dialog");
      $('#add').modal('show');
    };
    $scope.addWaterPointSteps = function(){
      return'views/add/step1.html';
    };

    $scope.waterPointTypes = {
      model: null,
      types: [
        {
          "id": 1,
          "typename": "pan"
        },
        {
          "id": 2,
          "typename": "borehole"
        },
        {
          "id": 3,
          "typename": "shallow well"
        },
        {
          "id": 4,
          "typename": "river"
        },
        {
          "id": 5,
          "typename": "micro water treatment plant"
        },
        {
          "id": 6,
          "typename": "well"
        },
        {
          "id": 7,
          "typename": "spring"
        },
        {
          "id": 8,
          "typename": "water trucking"
        }
      ]
    };
    $scope.years = {
      model: null,
      year: [
        {value: '2000', name: '2000'},
        {value: '2001', name: '2001'},
        {value: '2002', name: '2002'},
        {value: '2003', name: '2003'},
        {value: '2004', name: '2004'},
        {value: '2005', name: '20005'}
      ]
    };

    $scope.edit = function (waterpoint) {
      dataService.setWaterPoint(waterpoint);
      $('#add').modal('show');
    };

    $scope.delete = function (waterpoint) {
      $('#delete').modal('show');
    };

    angular.element(document).ready(function ()
    {
      angular.extend($scope, {
        center: {
          lat: 2.745530718801952,
          lng: 38.7103271484375,
          zoom: 7
        },
        defaults: {
          scrollWheelZoom: false
        }
      });

      console.log("Markers", $scope.markersData);
    });

    function getWaterPointsData(){
      $scope.isLoading = $scope.isLoading ? false : true;

      apiService.allWaterPoints().get({},function (response) {
        $scope.isLoading = $scope.isLoading ? false : true;
        //renderMarkers(success);
        renderData(response);
        return response;
      },function (error) {
        $scope.isLoading = $scope.isLoading ? false : true;
        console.log("Error", error.toString());
        $('#error').modal('show');
        $rootScope.$broadcast('topic', "Server responded with an error");
        return error;
      });
    }

    function getWaterPointData() {

    }

    function getPopulationData()
    {
      $scope.totalPopn = 0;
      var population = 0;
      apiService.population().get({},function (response) {
        console.log("Population", response);
        response.forEach(function (county) {
          $scope.totalPopn += county.population;
          console.log($scope.totalPopn);
        });
        //$scope.totalPopn = population;
      },function (error) {

      });
    }

    function waterMarkers(id, lat, lng, title, url, data)
    {
      var marker = {
        group: data.county,
        lat: lat,
        lng: lng,
        compileMessage: false,
        message: title,
        icon: {
          iconUrl: '../images/marker-icon.png'
        }

      };
      return marker;
    }

    function renderData(response)
    {
      var markers = [];
      $scope.table.length = 0;
      $scope.waterPointsData = response;
      $scope.noOfWaterPoints = $scope.waterPointsData.length;
      $scope.noOfFunctionalWaterPoints = $scope.noOfWaterPoints;
      $scope.noOfNonFunctionalWaterPoints = $scope.noOfWaterPoints - $scope.noOfFunctionalWaterPoints;
      $scope.popn = '46,050,303';

      $scope.waterPointsData.forEach(function (waterpoint)
      {
        markers.push(waterMarkers(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
        $scope.table.push({
              id: waterpoint.id,
              name: waterpoint.name,
              type: waterpoint.typeid.toLowerCase() === 'micro water treatment plant' ? 'MWTP': waterpoint.typeid,
              county: waterpoint.county,
              yoc: waterpoint.yearofconstruction=== null ? 'N/A' : waterpoint.yearofconstruction,
              status: angular.equals({}, waterpoint.operational_status) ? 'N/A' : waterpoint.operational_status.waterpointstatus,
              sensors: angular.equals({}, waterpoint.sensor_details) ? 'N/A' : 'Available',
              data: waterpoint
            });
      });
      console.log("Table", $scope.table);
      $scope.markersData = markers;
      angular.extend($scope, {
        markers: $scope.markersData
      });
      //console.log(response);
      dataService.setWaterPoints($scope.waterPointsData);
    }

    getPopulationData();


    /!*function actionsHtml(data, type, full, meta){
      return '<button class="btn btn-info" ng-click="view()">' +
        '   <i class="material-icons">visibility</i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-info" ng-click="">' +
        '   <i class="material-icons">edit</i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-info" ng-click="">' +
        '   <i class="material-icons">delete</i>' +
        '</button>';
    }
    function renderMarkers(response){
      var markers = [];
      $scope.waterPointsData = response;
      $scope.noOfWaterPoints = $scope.waterPointsData.length;
      $scope.noOfFunctionalWaterPoints = $scope.noOfWaterPoints;
      $scope.noOfNonFunctionalWaterPoints = $scope.noOfWaterPoints - $scope.noOfFunctionalWaterPoints;
      $scope.popn = '46,050,303';

      $scope.waterPointsData.forEach(function (waterpoint)
      {
        markers.push(waterMarkers(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
      });
      console.log("Table", $scope.table);
      $scope.markersData = markers;
      angular.extend($scope, {
        markers: $scope.markersData
      });
      //console.log(response);
      dataService.setWaterPoints($scope.waterPointsData);
    }
    function renderTable(promise) {

      console.log("Promises", promise);
      if($scope.iframeHeight < 900){
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(promise)
          .withPaginationType('full_numbers')
          .withOption('lengthMenu', [5, 10, 100,150])
          .withOption('deferRender', true);
      }
      else{
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(promise)
          .withPaginationType('full_numbers')
          .withOption('deferRender', true);
      }

      $scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('Name')
          .renderWith(function(data, type, full, meta) {
            return data.name.length > 15 ? data.name.substring(0, 15): data.name;
          }),
        DTColumnBuilder.newColumn(null).withTitle('Type')
          .renderWith(function(data, type, full, meta) {
            return data.typeid.toLowerCase() === 'micro water treatment plant' ? 'MWTP': data.typeid;
          }),
        DTColumnBuilder.newColumn('county').withTitle('County'),
        DTColumnBuilder.newColumn(null).withTitle('Status')
          .renderWith(function(data, type, full, meta) {
            return angular.equals({}, data.operational_status) ? '...' : data.operational_status.waterpointstatus;
          }),
        DTColumnBuilder.newColumn(null).withTitle('Sensors')
          .renderWith(function(data, type, full, meta) {
            return '...';
          }),
        DTColumnBuilder.newColumn(null).withTitle('YOC')
          .renderWith(function(data, type, full, meta) {
            return data.yearofconstruction=== null ? '...' : data.yearofconstruction;
          }),
        DTColumnBuilder.newColumn(null).withTitle('Action').withClass('text-center')
          .renderWith(actionsHtml)
      ];
      //$scope.dtInstanceCallback.draw();

    }*!/*/

  });
