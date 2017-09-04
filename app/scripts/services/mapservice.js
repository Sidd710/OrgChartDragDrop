'use strict';

/**
 * @ngdoc service
 * @name kenyaRapidApp.mapService
 * @description
 * # mapService
 * Service in the kenyaRapidApp.
 */
angular.module('kenyaRapidApp')
  .service('mapService', function () {
    var kenyaGeometry = {
      "bounds" : {
        "northEast" : {
          "lat" : 4.62931,
          "lng" : 41.97685
        },
        "southWest" : {
          "lat" : -4.816276,
          "lng" : 33.8679
        }
      },
      "location" : {
        "lat" : 1.6360475,
        "lng" : 40.3088626
      }
    };

    var wajirGeometry = {
      "bounds" : {
        "northEast" : {
          "lat" : 3.69863,
          "lng" : 40.99466
        },
        "southWest" : {
          "lat" : 0.18102,
          "lng" : 38.88874
        }
      },
      "location" : {
        "lat" : 1.6360475,
        "lng" : 40.3088626
      }
    };

    var marsabitGeometry = {
      "bounds":{
        "northEast" : {
          "lat" : 4.45507,
          "lng" : 39.34650
        },
        "southWest" : {
          "lat" : 1.26103,
          "lng" : 36.04932
        }
      }
    };

    var turkanaGeometry = {
      "bounds":{
        "northEast" : {
          "lat" : 4.62000,
          "lng" : 36.72528
        },
        "southWest" : {
          "lat" : 0.91128,
          "lng" : 33.98776
        }
      }
    };

    var garissaGeometry = {
      "bounds":{
        "northEast" : {
          "lat" : 0.99187,
          "lng" : 41.55936
        },
        "southWest" : {
          "lat" : -2.03993,
          "lng" : 38.65833
        }
      }
    };

    var isioloGeometry = {
      "bounds":{
        "northEast" : {
          "lat" : 2.09746,
          "lng" : 39.46289
        },
        "southWest" : {
          "lat" : -0.08864,
          "lng" : 36.86512
        }
      }
    };

    return{
      kenya: kenyaGeometry,
      wajir: wajirGeometry,
      marsabit: marsabitGeometry,
      turkana: turkanaGeometry,
      garissa: garissaGeometry,
      isiolo: isioloGeometry
    };
  });
