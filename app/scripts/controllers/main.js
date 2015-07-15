'use strict';

/**
 * @ngdoc function
 * @name lolrdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolrdApp
 */
angular.module('lolrdApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    var CHAMP_SQUARE_DATA_URL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/';

    $scope.champs = [];
    $scope.allchamps = [];

    activate();

    $scope.randomizePool = function(n) {

    }

    function formImgSquareUrl(champFile) {
      return CHAMP_SQUARE_DATA_URL + champFile;
    };

    function processStaticChampData(data) {
      $scope.allchamps = Object.keys(data);
      if (!$scope.champPool.length) {
        $scope.champPool = $scope.allchamps;
      }

      for (var i = 0 ; i < $scope.champPool.length; i++) {
        var champName = $scope.champPool[i];
        $scope.champs.push({
          'name': champName,
          'imgSquare': formImgSquareUrl(data[champName].image.full)
        });
      }
    };

    function processRouteParams(params) {
      var champPool = params['pool'];
      if (champPool) {
        $scope.champPool = champPool.split(',');
      } else {
        $scope.champPool = [];
      }
    };

    function activate() {
      $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json ').
      success(function(data, status, headers, config) {
        processStaticChampData(data.data);
      })
      .error(function(data, status, headers, config) {
        console.log(status);
        console.log(data);
      });

      processRouteParams($routeParams);
    };
  });
