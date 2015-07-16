'use strict';

/**
 * @ngdoc function
 * @name lolrdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lolrdApp
 */
angular.module('lolrdApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, $location, $mdToast) {
    var CHAMP_SQUARE_DATA_URL = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/';

    $scope.champs = [];
    $scope.allchamps = [];
    $scope.champData;
    $scope.url;

    activate();

    $scope.randomizePool = function(n) {
      $scope.champPool = $scope.allchamps;
      shuffle($scope.champPool);
      $scope.champs = [];
      for (var i = 0 ; i < n; i++) {
        var champName = $scope.champPool[i];
        $scope.champs.push({
          'name': champName,
          'imgSquare': formImgSquareUrl($scope.champData[champName].image.full)
        });
      }
      $scope.url = genUrl();
    };

    $scope.copyUrl = function () {
      return $location.absUrl() + $scope.url;
    };

    $scope.toast = function() {
      $mdToast.showSimple('Copied to clipboard!');
    };

    function genUrl() {
      var url = '?pool=' + $scope.champPool.slice(0, 24).join(',');
      return url;
    };

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

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
        $scope.champData = data.data;
        processStaticChampData(data.data);
      })
      .error(function(data, status, headers, config) {
        console.log(status);
        console.log(data);
      });

      processRouteParams($routeParams);
    };
  });
