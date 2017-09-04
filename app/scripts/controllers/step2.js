'use strict';

/**
 * @ngdoc function
 * @name kenyaRapidApp.controller:AddwaterpointCtrl
 * @description
 * # AddwaterpointCtrl
 * Controller of the kenyaRapidApp
 */
angular.module('kenyaRapidApp')
  .controller('Step2Ctrl', function ($state, $scope, $localStorage, dataService)
  {
    /*Variables*/
    $scope.waterpoint = dataService.getWaterPoint();
    $scope.landmark = dataService.getWaterPointLandmark();
    //$scope.counties = dataService.getCounties();
    //$scope.geography =  dataService.getGeography();
    $scope.subCounties = [];
    $scope.counties = [
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
    $scope.geography =  [
      {
        "sub_counties": [
          {
            "sub_county_name": "Garissa",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 1,
                    "name": "Waberi",
                    "constituencyid": 1
                  },
                  {
                    "id": 2,
                    "name": "Galbet",
                    "constituencyid": 1
                  },
                  {
                    "id": 3,
                    "name": "Township",
                    "constituencyid": 1
                  },
                  {
                    "id": 4,
                    "name": "Iftin",
                    "constituencyid": 1
                  }
                ],
                "constituency_name": "Garissa Township"
              }
            ]
          },
          {
            "sub_county_name": "Balambala",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 5,
                    "name": "Balambala",
                    "constituencyid": 2
                  },
                  {
                    "id": 6,
                    "name": "Danyere",
                    "constituencyid": 2
                  },
                  {
                    "id": 7,
                    "name": "Jarajara",
                    "constituencyid": 2
                  },
                  {
                    "id": 8,
                    "name": "Saka",
                    "constituencyid": 2
                  },
                  {
                    "id": 9,
                    "name": "Sankuri",
                    "constituencyid": 2
                  }
                ],
                "constituency_name": "Balambala"
              }
            ]
          },
          {
            "sub_county_name": "Lagdera",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 10,
                    "name": "Modogashe",
                    "constituencyid": 3
                  },
                  {
                    "id": 11,
                    "name": "Bename",
                    "constituencyid": 3
                  },
                  {
                    "id": 12,
                    "name": "Goreale",
                    "constituencyid": 3
                  },
                  {
                    "id": 13,
                    "name": "Maalamin",
                    "constituencyid": 3
                  },
                  {
                    "id": 14,
                    "name": "Sabena",
                    "constituencyid": 3
                  },
                  {
                    "id": 15,
                    "name": "Baraki",
                    "constituencyid": 3
                  }
                ],
                "constituency_name": "Lagdera"
              }
            ]
          },
          {
            "sub_county_name": "Dadaab",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 16,
                    "name": "Dertu",
                    "constituencyid": 4
                  },
                  {
                    "id": 17,
                    "name": "Dadaab",
                    "constituencyid": 4
                  },
                  {
                    "id": 18,
                    "name": "Labasigale",
                    "constituencyid": 4
                  },
                  {
                    "id": 19,
                    "name": "Damajale",
                    "constituencyid": 4
                  },
                  {
                    "id": 20,
                    "name": "Liboi",
                    "constituencyid": 4
                  },
                  {
                    "id": 21,
                    "name": "Abakaile",
                    "constituencyid": 4
                  }
                ],
                "constituency_name": "Dadaab"
              }
            ]
          },
          {
            "sub_county_name": "Fafi",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 22,
                    "name": "Bura",
                    "constituencyid": 5
                  },
                  {
                    "id": 23,
                    "name": "Dekaharia",
                    "constituencyid": 5
                  },
                  {
                    "id": 24,
                    "name": "Jarajila",
                    "constituencyid": 5
                  },
                  {
                    "id": 25,
                    "name": "Fafi",
                    "constituencyid": 5
                  },
                  {
                    "id": 26,
                    "name": "Nanighi",
                    "constituencyid": 5
                  }
                ],
                "constituency_name": "Fafi"
              }
            ]
          },
          {
            "sub_county_name": "Ijara",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 27,
                    "name": "Hulugho",
                    "constituencyid": 6
                  },
                  {
                    "id": 28,
                    "name": "Sangailu",
                    "constituencyid": 6
                  },
                  {
                    "id": 29,
                    "name": "Ijara",
                    "constituencyid": 6
                  },
                  {
                    "id": 30,
                    "name": "Masalani",
                    "constituencyid": 6
                  }
                ],
                "constituency_name": "Ijara"
              }
            ]
          }
        ],
        "county_name": "Garissa"
      },
      {
        "sub_counties": [
          {
            "sub_county_name": "Isiolo",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 110,
                    "name": "Wabera",
                    "constituencyid": 23
                  },
                  {
                    "id": 111,
                    "name": "Bulla Pesa",
                    "constituencyid": 23
                  },
                  {
                    "id": 112,
                    "name": "Burat",
                    "constituencyid": 23
                  },
                  {
                    "id": 113,
                    "name": "Ngaremara",
                    "constituencyid": 23
                  },
                  {
                    "id": 114,
                    "name": "Oldonyiro",
                    "constituencyid": 23
                  }
                ],
                "constituency_name": "Isiolo North"
              }
            ]
          },
          {
            "sub_county_name": "Merti",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 115,
                    "name": "Chari",
                    "constituencyid": 24
                  },
                  {
                    "id": 116,
                    "name": "Cherab",
                    "constituencyid": 24
                  }
                ],
                "constituency_name": "Merti"
              }
            ]
          },
          {
            "sub_county_name": "Garbatulla",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 117,
                    "name": "Kinna",
                    "constituencyid": 25
                  },
                  {
                    "id": 118,
                    "name": "Garbatulla",
                    "constituencyid": 25
                  },
                  {
                    "id": 119,
                    "name": "Sericho",
                    "constituencyid": 25
                  }
                ],
                "constituency_name": "Isiolo South"
              }
            ]
          }
        ],
        "county_name": "Isiolo"
      },
      {
        "sub_counties": [
          {
            "sub_county_name": "Moyale",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 31,
                    "name": "Butiye",
                    "constituencyid": 7
                  },
                  {
                    "id": 32,
                    "name": "Sololo",
                    "constituencyid": 7
                  },
                  {
                    "id": 33,
                    "name": "Golbo",
                    "constituencyid": 7
                  },
                  {
                    "id": 34,
                    "name": "Moyale Township",
                    "constituencyid": 7
                  },
                  {
                    "id": 35,
                    "name": "Uran",
                    "constituencyid": 7
                  },
                  {
                    "id": 36,
                    "name": "Obbu",
                    "constituencyid": 7
                  },
                  {
                    "id": 47,
                    "name": "Heillu",
                    "constituencyid": 7
                  }
                ],
                "constituency_name": "Moyale"
              }
            ]
          },
          {
            "sub_county_name": "North Horr",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 37,
                    "name": "Dukana",
                    "constituencyid": 8
                  },
                  {
                    "id": 38,
                    "name": "Maikona",
                    "constituencyid": 8
                  },
                  {
                    "id": 39,
                    "name": "Turbi",
                    "constituencyid": 8
                  },
                  {
                    "id": 40,
                    "name": "North Horr",
                    "constituencyid": 8
                  },
                  {
                    "id": 41,
                    "name": "Illeret",
                    "constituencyid": 8
                  }
                ],
                "constituency_name": "North Horr"
              }
            ]
          },
          {
            "sub_county_name": "Marsabit Central",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 42,
                    "name": "Karare",
                    "constituencyid": 9
                  },
                  {
                    "id": 43,
                    "name": "Marsabit Central",
                    "constituencyid": 9
                  },
                  {
                    "id": 48,
                    "name": "Sagante/Jaldesa",
                    "constituencyid": 9
                  }
                ],
                "constituency_name": "Saku"
              }
            ]
          },
          {
            "sub_county_name": "Laisamis",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 44,
                    "name": "Loiyangalani",
                    "constituencyid": 10
                  },
                  {
                    "id": 45,
                    "name": "Laisamis",
                    "constituencyid": 10
                  },
                  {
                    "id": 46,
                    "name": "Logo logo",
                    "constituencyid": 10
                  },
                  {
                    "id": 49,
                    "name": "Kargi/South Horr",
                    "constituencyid": 10
                  },
                  {
                    "id": 50,
                    "name": "Korr/Ngurunit",
                    "constituencyid": 10
                  }
                ],
                "constituency_name": "Laisamis"
              }
            ]
          }
        ],
        "county_name": "Marsabit"
      },
      {
        "sub_counties": [
          {
            "sub_county_name": "Turkana North",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 51,
                    "name": "Kaeris",
                    "constituencyid": 11
                  },
                  {
                    "id": 52,
                    "name": "Lake zone",
                    "constituencyid": 11
                  },
                  {
                    "id": 53,
                    "name": "Lapur",
                    "constituencyid": 11
                  },
                  {
                    "id": 54,
                    "name": "Kibish",
                    "constituencyid": 11
                  },
                  {
                    "id": 55,
                    "name": "Nakalale",
                    "constituencyid": 11
                  },
                  {
                    "id": 76,
                    "name": "Kaaleng/kaikor",
                    "constituencyid": 11
                  }
                ],
                "constituency_name": "Turkana North"
              }
            ]
          },
          {
            "sub_county_name": "Turkana West",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 56,
                    "name": "Kakuma",
                    "constituencyid": 12
                  },
                  {
                    "id": 57,
                    "name": "Lopur",
                    "constituencyid": 12
                  },
                  {
                    "id": 58,
                    "name": "Letea",
                    "constituencyid": 12
                  },
                  {
                    "id": 59,
                    "name": "Songot",
                    "constituencyid": 12
                  },
                  {
                    "id": 60,
                    "name": "Kalobeyei",
                    "constituencyid": 12
                  },
                  {
                    "id": 61,
                    "name": "Lokichoggio",
                    "constituencyid": 12
                  },
                  {
                    "id": 62,
                    "name": "Nanaam",
                    "constituencyid": 12
                  }
                ],
                "constituency_name": "Turkana West"
              }
            ]
          },
          {
            "sub_county_name": "Turkana Central",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 63,
                    "name": "Kerio Delta",
                    "constituencyid": 13
                  },
                  {
                    "id": 64,
                    "name": "Kang’atotha",
                    "constituencyid": 13
                  },
                  {
                    "id": 65,
                    "name": "Kalokol",
                    "constituencyid": 13
                  },
                  {
                    "id": 66,
                    "name": "Lodwar Township",
                    "constituencyid": 13
                  },
                  {
                    "id": 67,
                    "name": "Kanamkemer",
                    "constituencyid": 13
                  }
                ],
                "constituency_name": "Turkana Central"
              }
            ]
          },
          {
            "sub_county_name": "Turkana South",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 70,
                    "name": "Kaputir",
                    "constituencyid": 14
                  },
                  {
                    "id": 71,
                    "name": "Katilu",
                    "constituencyid": 14
                  },
                  {
                    "id": 72,
                    "name": "Lobokat",
                    "constituencyid": 14
                  },
                  {
                    "id": 73,
                    "name": "Kalapata",
                    "constituencyid": 14
                  },
                  {
                    "id": 74,
                    "name": "Lokichar",
                    "constituencyid": 14
                  }
                ],
                "constituency_name": "Turkana South"
              }
            ]
          },
          {
            "sub_county_name": "Turkana East",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 75,
                    "name": "Katilia",
                    "constituencyid": 15
                  },
                  {
                    "id": 79,
                    "name": "Kapedo/Napeito M",
                    "constituencyid": 15
                  },
                  {
                    "id": 80,
                    "name": "Lokori/Kochodin",
                    "constituencyid": 15
                  }
                ],
                "constituency_name": "Turkana East"
              }
            ]
          },
          {
            "sub_county_name": "Loima",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 68,
                    "name": "Turkwel",
                    "constituencyid": 16
                  },
                  {
                    "id": 69,
                    "name": "Loima",
                    "constituencyid": 16
                  },
                  {
                    "id": 77,
                    "name": "Kotaruk/Lobei",
                    "constituencyid": 16
                  },
                  {
                    "id": 78,
                    "name": "Lokiriama/Loren Gippi",
                    "constituencyid": 16
                  }
                ],
                "constituency_name": "Loima"
              }
            ]
          }
        ],
        "county_name": "Turkana"
      },
      {
        "sub_counties": [
          {
            "sub_county_name": "Wajir East",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 81,
                    "name": "Township",
                    "constituencyid": 17
                  },
                  {
                    "id": 82,
                    "name": "Barwaqo",
                    "constituencyid": 17
                  },
                  {
                    "id": 83,
                    "name": "Khorof Harar",
                    "constituencyid": 17
                  }
                ],
                "constituency_name": "Wajir East"
              }
            ]
          },
          {
            "sub_county_name": "Wajir West",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 84,
                    "name": "Arbajahan",
                    "constituencyid": 18
                  },
                  {
                    "id": 85,
                    "name": "Hadado/Athibohol",
                    "constituencyid": 18
                  },
                  {
                    "id": 86,
                    "name": "Adamasajide",
                    "constituencyid": 18
                  },
                  {
                    "id": 87,
                    "name": "Ganyure/Wagalla",
                    "constituencyid": 18
                  }
                ],
                "constituency_name": "Wajir West"
              }
            ]
          },
          {
            "sub_county_name": "Wajir South",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 88,
                    "name": "Benane",
                    "constituencyid": 19
                  },
                  {
                    "id": 89,
                    "name": "Burder",
                    "constituencyid": 19
                  },
                  {
                    "id": 90,
                    "name": "Dadajabula",
                    "constituencyid": 19
                  },
                  {
                    "id": 91,
                    "name": "Habaswein",
                    "constituencyid": 19
                  },
                  {
                    "id": 92,
                    "name": "Lagbogol south",
                    "constituencyid": 19
                  },
                  {
                    "id": 93,
                    "name": "Ibrahim Ure",
                    "constituencyid": 19
                  },
                  {
                    "id": 94,
                    "name": "Diff",
                    "constituencyid": 19
                  }
                ],
                "constituency_name": "Wajir South"
              }
            ]
          },
          {
            "sub_county_name": "Wajir North",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 95,
                    "name": "Gurar",
                    "constituencyid": 20
                  },
                  {
                    "id": 96,
                    "name": "Bute",
                    "constituencyid": 20
                  },
                  {
                    "id": 97,
                    "name": "Korondille",
                    "constituencyid": 20
                  },
                  {
                    "id": 98,
                    "name": "Malkagufu",
                    "constituencyid": 20
                  },
                  {
                    "id": 99,
                    "name": "Batalu",
                    "constituencyid": 20
                  },
                  {
                    "id": 100,
                    "name": "Danaba",
                    "constituencyid": 20
                  },
                  {
                    "id": 101,
                    "name": "Godoma",
                    "constituencyid": 20
                  }
                ],
                "constituency_name": "Wajir North"
              }
            ]
          },
          {
            "sub_county_name": "Tarbaj",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 106,
                    "name": "Elben",
                    "constituencyid": 21
                  },
                  {
                    "id": 107,
                    "name": "Sarman",
                    "constituencyid": 21
                  },
                  {
                    "id": 108,
                    "name": "Tarbaj",
                    "constituencyid": 21
                  },
                  {
                    "id": 109,
                    "name": "Wargadud",
                    "constituencyid": 21
                  }
                ],
                "constituency_name": "Tarbaj"
              }
            ]
          },
          {
            "sub_county_name": "Eldas",
            "constituencies": [
              {
                "wards": [
                  {
                    "id": 102,
                    "name": "Eldas",
                    "constituencyid": 22
                  },
                  {
                    "id": 103,
                    "name": "Della",
                    "constituencyid": 22
                  },
                  {
                    "id": 104,
                    "name": "Lakoley south/Basir",
                    "constituencyid": 22
                  },
                  {
                    "id": 105,
                    "name": "Elnur",
                    "constituencyid": 22
                  }
                ],
                "constituency_name": "Eldas"
              }
            ]
          }
        ],
        "county_name": "Wajir"
      }
    ];

    console.log("waterpoint", $scope.waterpoint);

    $scope.getSubCounties = function (cty) {
      console.log("County", cty);
      console.log("Geog", $scope.geography);

      $scope.geography.forEach(function (county){
        console.log(county);
        console.log(county.county_name);
        if (county.county_name === cty)
        {
          $scope.subCounties = county.sub_counties;
        }
      });
    };

    $scope.getWards = function (subCty)
    {
      $scope.subCounties.forEach(function (subCounty) {
        $scope.constituencies = subCounty.constituencies;
      });

      $scope.wards = $scope.constituencies[0].wards;
      console.log("Constituencies", $scope.constituencies);
      console.log("Wards", $scope.wards);
    };
    $scope.back = function (id) {
      $state.transitionTo('main.add.step1');
    };
    $scope.next = function () {
      dataService.setWaterPoint($scope.waterpoint);
      $localStorage.$default({
        'newWaterPoint': $scope.waterpoint,
        'newWPLandmark': $scope.landmark
      });
      $state.transitionTo('main.add.step3');
    };

    $('#step2').addClass('active');
    $('#label2').addClass('active');
  });
