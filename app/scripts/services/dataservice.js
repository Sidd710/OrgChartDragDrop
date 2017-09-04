'use strict';

/**
 * @ngdoc service
 * @name kenyaRapidApp.dataService
 * @description
 * # dataService
 * Service in the kenyaRapidApp.
 */
angular.module('kenyaRapidApp')
  .service('dataService', function () {

    var counties;
    var waterPointTypes;
    var popn;
    var waterPoint;
    var cost;
    var landmark;
    var usage;
    var geography;
    var temp;

    var waterPoints = [];

    var setCounties = function(countys){
      counties = countys;
    };

    var getCounties = function () {
      return counties;
    };

    var setWaterPointTypes = function (types) {
      waterPointTypes = types;
    };

    var getWaterPointTypes = function () {
      return waterPointTypes;
    };

    var setPopulation = function (ppn) {
      popn = ppn;
    };

    var getPopulation = function () {
      return popn;
    };

    var setWaterPoint = function(waterpoint){
      console.log("Service call", waterpoint);
      waterPoint = waterpoint;
    };

    var getWaterPoint = function () {
      return waterPoint;
    };

    var setWaterPoints = function(waterpoints){
      waterPoints = waterpoints;
    };

    var getWaterPoints = function () {
      return waterPoints;
    };

    var setWaterPointCost = function (value) {
      cost = value;
    };

    var getWaterPointCost = function () {
      return cost;
    };

    var setWaterPointLandmark = function (land) {
      landmark = land;
    };

    var getWaterPointLandmark = function () {
      return landmark;
    };

    var setWaterPointUsage = function (value) {
      usage = value;
    };

    var getWaterPointUsage = function () {
      return usage;
    };

    var setGeography = function (geog) {
      geography = geog;
    };

    var getGeography = function () {
      return geography;
    };

    var setTemp = function (tmp) {
      temp = tmp;
    };

    var getTemp = function(){
      return temp;
    };

    return{
      setCounties: setCounties,
      getCounties: getCounties,
      setWaterPointTypes: setWaterPointTypes,
      getWaterPointTypes: getWaterPointTypes,
      setPopulation: setPopulation,
      getPopulation: getPopulation,
      setWaterPoint: setWaterPoint,
      getWaterPoint: getWaterPoint,
      setWaterPoints: setWaterPoints,
      getWaterPoints: getWaterPoints,
      setWaterPointCost: setWaterPointCost,
      getWaterPointCost: getWaterPointCost,
      setWaterPointLandmark: setWaterPointLandmark,
      getWaterPointLandmark: getWaterPointLandmark,
      setWaterPointUsage: setWaterPointUsage,
      getWaterPointUsage: getWaterPointUsage,
      setGeography : setGeography,
      getGeography : getGeography,
      setTemp : setTemp,
      getTemp : getTemp

    };
  });
