'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:MapviewCtrl
 * @description
 * # MapviewCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('MapviewCtrl', function ($scope, apiService, dataService,
                                       mapService, leafletData, leafletMarkersHelpers)
  {
    /*Variables*/
    $scope.markersData = [];

    leafletData.getMap('mapview').then(function (map)
    {
      leafletMarkersHelpers.resetMarkerGroups();
      renderMarkers();

    });

    function initializeMap() {
      angular.extend($scope, {
        center: {
        },
        bounds: mapService.kenya.bounds,
        defaults: {
          scrollWheelZoom: false
        }
      });
    }

    function getWaterPoints(){
      if(dataService.getWaterPoints().length === 0){
        //TODO: Pull from the server api
      }
      else{
        $scope.waterPointsData = dataService.getWaterPoints();
      }
    }

    function renderMarkers(){
      var markers = [];
      $scope.waterPointsData.forEach(function (waterpoint)
      {
        markers.push(waterMarkers(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
      });

      $scope.markersData= [].concat(markers);
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

    getWaterPoints();
    initializeMap();
    /*/!*Variables*!/
    $scope.markers = [];
    $scope.waterPointUrl = '';

    /!*Router fn: display the relevant view within main container*!/
    $scope.addWaterPoint = function () {
      return $scope.waterPointUrl;
    };

    uiGmapGoogleMapApi.then(function (maps)
    {
      // $scope.markerEvents = function (marker, eventName, model) {
      //   console.log("Marker", marker);
      // }
    });

    function map(center, zoom, bounds) {
      $scope.map = {
        center: {
          latitude: center.lat,
          longitude: center.lng
        },
        zoom: zoom,
        options: {
          disableDefaultUI: true,
        },
        bounds: {
          northeast: {
            latitude: bounds.northeast.lat,
            longitude: bounds.northeast.lng
          },
          southwest: {
            latitude: bounds.southwest.lat,
            longitude: bounds.southwest.lng
          }
        },
        events: {
          click: function(mapModel, eventName, originalEventArgs)
          {
            console.log("user defined event: " + eventName, mapModel, originalEventArgs);
            var e = originalEventArgs[0];
            $scope.latitude = e.latLng.lat();
            $scope.longitude = e.latLng.lng();
            console.log("E", e.latLng.lat());
            //$scope.waterPointUrl = 'views/crud/location.html';
          }
        },
        markersEvent: {
          click: function (marker, eventName, model)
          {
            var data = model.data;
            console.log("DAta", data);
            $scope.waterPointUrl = 'views/waterpoint.html'
            dataService.setWaterPoint(data);

            // if($scope.addWpDetails === 'views/waterpoint.html')
            // {
            //   console.log("TRUE");
            //   $rootScope.$emit("eventName");
            // }
            // else{
            //   $scope.addWpDetails = 'views/waterpoint.html';
            // }
          }
        }
      };
    }

    function initialize(county)
    {
      getData(county);
      switch (county){
        case 'wajir':
          map(mapService.wajir.location, 8, mapService.wajir.bounds);
          break;
        case 'garissa':
          map(mapService.wajir.location, 8, mapService.wajir.bounds);
          break;
        default:
          map(mapService.kenya.location, 6, mapService.kenya.bounds);
          break;
      }
    }

    function icon(type) {
      switch (type){
        case 'Water Trucking':
          return 'images/truck.png';
        case 'Pan':
          return 'images/waterwell.png';
        case 'Borehole':
          return 'images/borehole.png';
        default:
          return 'images/waterdrop.png';
      }
    }

    function waterPoint(id, lat, lng, title, url, data)
    {
      var marker = {
        latitude: lat,
        longitude: lng,
        title: title,
        icon: {
          url: icon(url)
        },
        data: data
      };
      marker.id = id;
      return marker;
    }

    function getAllWaterPointData(county) {
      var waterPoints = [];

      apiService.allWaterPoints().get({},
        function success(response) {
          console.log("Success:" + JSON.stringify(response));

          $scope.waterPointsData = response;
          $scope.waterPointsData.forEach(function (waterpoint)
          {
            waterPoints.push(waterPoint(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
          });
          $scope.markers = waterPoints;

        },
        function error(errorResponse) {
          console.log("Error:" + JSON.stringify(errorResponse));
        });
    }

    function getWaterPointData(county) {
      var waterPoints = [];

      apiService.waterPoints(county).get({},
        function success(response) {
          //console.log("Success:" + JSON.stringify(response));

          $scope.waterPointsData = response;
          $scope.waterPointsData.forEach(function (waterpoint)
          {
            waterPoints.push(waterPoint(waterpoint.id, waterpoint.lat, waterpoint.lon, waterpoint.name, waterpoint.typeid, waterpoint));
          });
          $scope.markers = waterPoints;

        },
        function error(errorResponse) {
          console.log("Error:" + JSON.stringify(errorResponse));
        });
    }

    function getData(county){
      if(county === '')
      {
        console.log("Getting all waterpoint data");
        getAllWaterPointData();
      }
      else
      {
        getWaterPointData(county);
      }
    }

    initialize('');*/
  });
