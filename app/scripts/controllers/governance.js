'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:GovernanceCtrl
 * @description
 * # GovernanceCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('GovernanceCtrl', function ($scope, apiService, SweetAlert, $http) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    $scope.isLoading = false;

    $scope.setOfficerDetail = function (response) {

      var officer = response;
      officer.name = response.position.name;
      officer.firstName = response.firstname + " " + response.lastname;
      officer.email = response.email;
      officer.phone = response.phone;
      officer.social = response.county;
      officer.note1 = response.responsibilities;
      officer.details = officer.firstName +  "<br>"  + "<hr>" +  officer.phone +  "<br>"  +  officer.email;
      return officer;
    };
    $scope.loading = function () {
      return 'views/templates/loading.html';
    };
    $scope.initGovernance = function (countyName) {

      $scope.isLoading = $scope.isLoading ? false : true;
      apiService.counties().get({}, function (countryResponse) {

        $scope.counties = countryResponse;
      });
      $scope.selectedCountyName = countyName;
      apiService.officers().get({}, function (response) {



        var officers = response;
        debugger;
        if (countyName != undefined) {

          var filteredData = response.filter(function (obj) { return obj.county.name === countyName });

          officers = filteredData;

        }
        $scope.officersData = officers;


        $scope.isLoading = $scope.isLoading ? false : true;
        var map = {}, officer, roots = [];
        for (var i = 0; i < officers.length; i += 1) {
          officer = $scope.setOfficerDetail(officers[i]);
          officer.children = [];
          map[officer.id] = i; // use map to look-up the parents
          if (officer.manager !== null && officer.manager.id !== "0") {
            officers[map[officer.manager.id]].children.push(officer);
          } else {
            roots.push(officer);
          }
        }

        console.log(roots); // <-- there's your tree
        $scope.parameters = roots[0];

        if ($('#chart-container') != undefined) {
          $('#chart-container').empty();
        }

        var chart = $('#chart-container').orgchart({
          'data': $scope.parameters,
          'draggable': true,
          'depth': 4,
          'nodeContent': 'details',
          'nodeID': 'id',
          'createNode': function ($node, data) {
            /* if (data.name === 'Governor / Deputy Governor') {
                    $node.append('<div class="assistant">Kobayashi</div>');
                   }
             else if (data.name === 'County Secretariat') {
                      $node.append('<div class="assistant">CS</div>');
                     }

            var secondMenuIcon = $('<i>', {
              'class': 'fa fa-info-circle second-menu-icon',
              click: function () {
                $(this).siblings('.second-menu').toggle();
              }
            });*/


            $node.on('click', function (event) {
              debugger;
              if (!$(event.target).is('.edge')) {
                $('#selected-node').val(data.name).data('node', $node);
                console.log(data.name);
                $('#selNode').text(data.name);
                $('#titNode').text(data.position);
                $('#note1').text(data.responsibilities);
                $('#phone').text(data.phone);
                $('#firstName').text(data.firstname);
                $('#lastName').text(data.lastname);
                $('#email').text(data.email);
                $('#social').text(data.social);
                $('#county').text(data.county.name);
                $('#myModal').modal('show');
                $('.orgchart').removeClass('noncollapsable');
              }
            });

          }

        });

        chart.$chart.on('init.orgchart', function (event) {

          console.log('init:');

        });
      }, function (error) {

      });
    }
    $scope.edit = function (root) {
      $('#EditModal').modal('show');
      $(".modal-backdrop").fadeOut("slow");
      apiService.counties().get({}, function (countryResponse) {

        $scope.counties = countryResponse;
      });

      apiService.officers().get({}, function (response) {

        $scope.officersDataForDropDown = response;
        debugger;
        $scope.officer = root;

      })

    }
    $scope.addPopup = function () {

      $('#AddModal').modal('show');
      $(".modal-backdrop").fadeOut("slow");
      apiService.officers().get({}, function (response) {

        $scope.officersDataForDropDown = response;
       // $scope.officer = [];
       // $scope.officer.manager = $scope.officersDataForDropDown[0];

      });
      apiService.counties().get({}, function (response) {

        $scope.counties = response;
//        $scope.county = $scope.county || {};
//       $scope.officer.county = $scope.counties[0];
      });
    }

    $scope.updateRecord = function (updateRecord) {
      $scope.data = {};
      $scope.data["county"] = updateRecord.county;
      $scope.data["editor"] = updateRecord.editor;
      $scope.data["email"] = updateRecord.email;
      $scope.data["lastname"] = updateRecord.lastname;
      $scope.data["manager"] = updateRecord.manager;
      $scope.data["firstname"] = updateRecord.firstname;
      $scope.data["id"] = updateRecord.id;
      $scope.data["phone"] = updateRecord.phone;
      $scope.data["position"] = updateRecord.position;
      $scope.data["responsibilities"] = updateRecord.responsibilities;
      var JSONObj = { "county ": updateRecord.county, "id": updateRecord.id };
      // var record=JSON.stringify($scope.data);
      $scope.isLoading = $scope.isLoading ? false : true;
      var config = {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      $http.put("https://krapid-orgchart.mybluemix.net/api/officers", $scope.data, config)
        .then(
        function (response) {
          $scope.isLoading = $scope.isLoading ? false : true;
          SweetAlert.swal("Success!", "Position edited successfully", "success");
          $('#EditModal').modal('hide');
          $(".modal-backdrop").fadeOut("slow");
          $scope.initGovernance();

        },

        function (response) {
          $scope.isLoading = $scope.isLoading ? false : true;
          SweetAlert.swal("Error!", "You are not permitted to perform this action", "error");
          $('#EditModal').modal('hide');
          $(".modal-backdrop").fadeOut("slow");
          // failure callback
        }
        );

    }

    $scope.addRecord = function (details) {
      $scope.data = {};
      $scope.data["county"] = details.county;
      // $scope.data["editor"]=details.editor;
      $scope.data["email"] = details.email;
      $scope.data["firstname"] = details.firstname;
      $scope.data["lastname"] = details.lastname;

      if (details.manager != "" && details.manager != null) {
        $scope.data["manager"] = details.manager;
      }
      //  $scope.data["id"]=updateRecord.id;
      $scope.data["phone"] = details.phone;

      var postion = {
        "id": 1,
        "name": details.position
      }
      $scope.data["position"] = postion;
      $scope.data["responsibilities"] = details.responsibilities;
      $scope.isLoading = $scope.isLoading ? false : true;

      SweetAlert.swal({
        title: "Confirm action?",
        text: "This action may change the governance hierachy!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, add position!",
        closeOnConfirm: false
      },
        function (success) {
          $scope.isLoading = $scope.isLoading ? false : true;
          $('#AddModal').modal('hide');
          $(".modal-backdrop").fadeOut("slow");
          //location.reload();
          $http({
            method: "POST",

            url: "https://krapid-orgchart.mybluemix.net/api/officers",
            withCredentials: true,
            data: $scope.data,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwNjE1NTY4Mn0.dnGFMny_Jcp43iFanfXwUihtZCH4Nyk9ojXL5TV3iW5qFQv-ljtMlbUZcOB10QSXBQ9x-OSk8yHalh05WYGnWg"

            }
          }).
            then(function success(response) {
              SweetAlert.swal("Success!", "Position added successfully", "success");
              $scope.initGovernance();

            },
            function error(response) {
              SweetAlert.swal("Error!", "You are not permitted to perform this action", "error");
            }
            );

        }),
        function (error) {
          $scope.isLoading = $scope.isLoading ? false : true;
          SweetAlert.swal("Error!", "You are not permitted to perform this action", "error");
          $('#AddModal').modal('hide');
          $(".modal-backdrop").fadeOut("slow");
        }

    }

    $scope.delete = function (data) {
      // if (confirm('Are you sure you want to delete this record?')) {
      $scope.deleteRecord(data.id);
      // } else {
      //   // Do nothing!
      // }
    }
    $scope.deleteRecord = function (id) {


      SweetAlert.swal({
        title: "Confirm action?",
        text: "Are you sure you want to delete record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false
      },
        function (success) {
          if (success == true) {
            var url = "https://krapid-orgchart.mybluemix.net/api/officers/" + id;
            $scope.isLoading = $scope.isLoading ? false : true;
            apiService.deleteOfficer(url).delete({}, function (response) {
              $scope.isLoading = $scope.isLoading ? false : true;
              SweetAlert.swal("Success!", "Position deleted successfully", "success");
              $scope.initGovernance();
            })
          }
        },
        function error(response) {
          SweetAlert.swal("Error!", "You are not permitted to perform this action", "error");
        }

      );




    }

  });



