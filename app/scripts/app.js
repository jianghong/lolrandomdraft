'use strict';

/**
 * @ngdoc overview
 * @name lolrdApp
 * @description
 * # lolrdApp
 *
 * Main module of the application.
 */
angular
  .module('lolrdApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngClipboard'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider, ngClipProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
    ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
  });
