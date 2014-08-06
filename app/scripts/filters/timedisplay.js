'use strict';

/**
 * @ngdoc filter
 * @name angularPlayerApp.filter:timeDisplay
 * @function
 * @description
 * # timeDisplay
 * Filter in the angularPlayerApp.
 */
angular.module('angularPlayerApp')
  .filter('timeDisplay', function () {
    return function (input) {
      return 'timeDisplay filter: ' + input;
    };
  });
