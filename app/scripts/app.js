'use strict';

/**
 * @ngdoc overview
 * @name kenyaRapidApp
 * @description
 * # kenyaRapidApp
 *
 * Main module of the application.
 */
angular
  .module('kenyaRapidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'datatables',
    'oitozero.ngSweetAlert',
    'leaflet-directive',
    'ui.router',
    'ngStorage'
  ])
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('main.dashboard',{
        url: 'dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('main.map',{
        url: 'map',
        templateUrl: 'views/mapview.html',
        controller: 'MapviewCtrl'
      })
      .state('main.governance',{
       url: 'governance',
       templateUrl: 'views/governance.html',
       controller: 'GovernanceCtrl'
       })
       .state('main.budget',{
       url: 'budget',
       templateUrl: 'views/waterbudget.html',
       controller: 'WaterBudgetCtrl'
       })
      .state('main.profile',{
        url: 'profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('main.about',{
        url: 'about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('main.waterpoint',{
        url: 'waterpoint',
        templateUrl: 'views/waterpoint.html',
        controller: 'WaterpointCtrl'
      })
      .state('main.add',{
        url: 'new/waterpoint',
        templateUrl: 'views/addwaterpoint.html',
        controller: 'AddwaterpointCtrl'
      })
      .state('main.add.step1',{
        url: '/step1',
        templateUrl: 'views/add/step1.html',
        controller: 'Step1Ctrl'
      })
      .state('main.add.step2',{
        url: '/step2',
        templateUrl: 'views/add/step2.html',
        controller: 'Step2Ctrl'
      })
      .state('main.add.step3',{
        url: '/step3',
        templateUrl: 'views/add/step3.html',
        controller: 'Step3Ctrl'
      })
      .state('main.add.step4',{
        url: '/step4',
        templateUrl: 'views/add/step4.html',
        controller: 'Step4Ctrl'
      })
  })
  .config(['uiGmapGoogleMapApiProvider',function (GoogleMapApiProvider) {
   GoogleMapApiProvider.configure({
      key: 'AIzaSyCzIiLSKv-s8JWtC2ghTM_m859n0U6g_C4',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  }]);
