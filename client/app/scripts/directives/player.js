'use strict';

angular.module('clientApp')
  .directive('player', function () {
    return {
      link: function postLink(scope, element, attrs) {
        console.log(element)
        scope.player = element[0];
      }
    };
  });
