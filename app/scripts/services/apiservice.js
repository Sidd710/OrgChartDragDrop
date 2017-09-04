'use strict';

/**
 * @ngdoc service
 * @name kenyaRapidApp.apiService
 * @description
 * # apiService
 * Service in the kenyaRapidApp.
 */
angular.module('kenyaRapidApp')
  .factory('apiService', function ($resource,$q) {

    var url = "https://kenyarapid.mybluemix.net";
    return{
      counties: function () {
        return $resource(url+"/data/countys", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      waterPointTypes: function () {
        return $resource(url+"/data/waterpointtype", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      population: function () {
        return $resource(url+"/data/population", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      failureMgmt: function () {
        return $resource(url+"/data/failurereporting", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      servicingMgmt: function () {
        return $resource(url+"/data/servicingorg", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      geography: function () {
        return $resource(url+"/data/geography", {},{
          get: {method: 'GET', cache:true, isArray: true}
        });
      },
      allWaterPoints: function(){
        return $resource(url+ "/data/waterpoint", {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      waterPointsPerCounty: function(county){
        return $resource(url+ "/data/waterpoint?county="+county, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      waterPointsPerType: function(type){
        return $resource(url+ "/data/waterpoint?water_point_type="+type, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      waterPointsPerTypeCounty: function(type, county){
        return $resource(url+ "/data/waterpoint?water_point_type="+type+"&county="+county, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      addWaterPoint: function(){
        return $resource(url+ "/data/waterpoint", {}, {
          save:
            {method: 'POST',
              cache: true,
              isArray: false
            }
        });
      },
      deleteWaterPoint: function(){
        return $resource(url+ "/data/waterpoint", {}, {
          remove: {method: 'DELETE', cache: true, isArray: false}
        });
      },
      waterPointUsage: function(id){
        return $resource(url+ "/data/usage?water_point_id="+id, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      addWaterPointUsage: function(){
        return $resource(url+ "/data/usage", {}, {
          save:
            {method: 'POST', cache: true, isArray: false
            }
        });
      },
      waterPointLandmarks: function(id){
        return $resource(url+ "/data/landmarks?water_point_id="+id, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      waterPointCost: function(id){
        return $resource(url+ "/data/cost?water_point_id="+id, {}, {
          get: {method: 'GET', cache: true, isArray: true}
        });
      },
      addWaterPointCost: function(){
        return $resource(url+ "/data/cost", {}, {
          save:{method: 'POST', cache: true, isArray: false}
        });
      },
      officers: function(){
        return $resource("https://krapid-orgchart.mybluemix.net/api/officers?size=100",{},{
          get:{
            method:'GET',
            cache:false,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg',
              'Accept':'application/json' }
            , isArray: true
          }
        });
      },
      editOfficer:function(officerData)
      {

        return $resource("https://krapid-orgchart.mybluemix.net/api/officers",{officerData:officerData },{
          update:{
            method:'PUT',

            cache:false,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg',
              'Accept':'application/json' ,
              'Content-Type':'application/json' }

          }
        });
      },
      addOfficer:function(officerData)
      {
        debugger;

        return $resource("https://krapid-orgchart.mybluemix.net/api/officers",{},{
          post:{
            method:'POST',
            cache:true,
            headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg',
              'Accept':'application/json' ,
              'Content-Type':'application/json' }
            , isArray: false
          }
        });
      },
      deleteOfficer:function(id)
      {

        debugger;
        return $resource(id,{},{
          delete:{
            method:'DELETE',
            cache:true,
            headers: { 'Accept':'application/json',
              'Authorization': ' Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg',

            }
            , isArray: false
          }
        });

      },
      /*allWaterPointsPromise:function () {
        var defer = $q.defer();
        this.allWaterPoints().get({},function (success) {
          defer.resolve(success);
        },function (error) {
          defer.reject(error);
        });
        return defer.promise;
      },
      waterPointsPromise:function (county) {
        var defer = $q.defer();
        this.waterPoints(county).get({},function (success) {
          defer.resolve(success);
        },function (error) {
          defer.reject(error);
        });
        return defer.promise;
      }*/
    };
  });
