'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('Step1Ctrl', function ($state, $scope, $localStorage, dataService)
  {
    /*Variables*/
    $scope.waterpoint = dataService.getWaterPoint();
    $scope.usage = dataService.getWaterPointUsage();
    $scope.isOther = false;
    $scope.isBorehole = false;
    $scope.years = [
      {value: '1990', name: '1990'},
      {value: '1991', name: '1991'},
      {value: '1992', name: '1992'},
      {value: '1993', name: '1993'},
      {value: '1994', name: '1994'},
      {value: '1995', name: '1995'},
      {value: '1996', name: '1996'},
      {value: '1997', name: '1997'},
      {value: '1998', name: '1998'},
      {value: '1999', name: '1999'},
      {value: '2000', name: '2000'},
      {value: '2001', name: '2001'},
      {value: '2002', name: '2002'},
      {value: '2003', name: '2003'},
      {value: '2004', name: '2004'},
      {value: '2005', name: '2005'},
      {value: '2006', name: '2006'},
      {value: '2007', name: '2007'},
      {value: '2008', name: '2008'},
      {value: '2009', name: '2009'},
      {value: '2010', name: '2010'},
      {value: '2011', name: '2011'},
      {value: '2012', name: '2012'},
      {value: '2013', name: '2013'},
      {value: '2014', name: '2014'},
      {value: '2015', name: '2015'},
      {value: '2016', name: '2016'},
      {value: '2017', name: '2017'}
    ];
    $scope.county = [
      {
        "id": 1,
        "name": "Garissa"
      },
      {
        "id": 2,
        "name": "Isiolo"
      },
      {
        "id": 3,
        "name": "Marsabit"
      },
      {
        "id": 4,
        "name": "Turkana"
      },
      {
        "id": 5,
        "name": "Wajir"
      }
    ];
    $scope.waterPointTypes = [
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
      },
      {
        "id": -1,
        "typename": "other"
      }
    ];

    $scope.getSelectedWaterPointType = function (type) {
      console.log("Selected is: "+type);
      if(type === -1){
        $scope.isOther = true;
        console.log("Test");
      }
      else if(type === 2){
        $scope.isBorehole = true;
      }
      else{
        $scope.isOther = false;
        $scope.isBorehole = false;
      }
    };

    $scope.back = function (id) {
      $state.transitionTo('main.add.step1');
    };
    $scope.next = function (id) {
      dataService.setWaterPoint($scope.waterpoint);
      dataService.setWaterPointUsage($scope.usage);
      $localStorage.$default({
        'newWaterPoint': $scope.waterpoint,
        'newWPUsage': $scope.usage,
      });
      $state.transitionTo('main.add.step2');
    };
  });
