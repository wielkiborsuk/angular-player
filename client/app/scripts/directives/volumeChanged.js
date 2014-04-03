'use strict';

angular.module('clientApp')
  .directive('volumeChanged', function ($rootScope) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        $rootScope.volume = element[0];
        element.bind('change', function () {
          $rootScope.player.volume = 1.0*element.val()/100;
        });
      }
    };
  });
