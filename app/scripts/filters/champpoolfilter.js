'use strict';

/**
 * @ngdoc filter
 * @name lolrdApp.filter:champPoolFilter
 * @function
 * @description
 * # champPoolFilter
 * Filter in the lolrdApp.
 */
angular.module('lolrdApp')
  .filter('champPoolFilter', function () {
    return function (input, champPool) {
      for (champ in champPool) {
        if (input.toLowerCase() === champ.toLowerCase()) {
          return true;
        }
      }
      return false;
    };
  });
