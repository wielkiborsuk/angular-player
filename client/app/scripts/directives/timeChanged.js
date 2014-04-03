'use strict';

angular.module('clientApp')
  .directive('timeChanged', function ($rootScope) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        $rootScope.timer = element[0];

        element.bind('mouseup', function () {
          $rootScope.player.play();
        });

        element.bind('mousedown', function () {
          $rootScope.player.pause();
        });

        element.bind('change', function () {
          var time = element.val() / ($rootScope.gradiation / $rootScope.player.duration);
          $rootScope.player.currentTime = time;
        });
      }
    };
  });
