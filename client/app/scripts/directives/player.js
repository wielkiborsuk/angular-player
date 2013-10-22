'use strict';

angular.module('clientApp')
  .directive('player', function ($rootScope) {
    return {
      link: function postLink(scope, element, attrs) {
        // console.log(element)
        $rootScope.player = element[0];
        $rootScope.player.volume = scope.init_volume;

        element.bind('ended', function () {
          scope.$apply(function () {
            scope.next();
          })
        })

        element.bind('timeupdate', function () {
          var val = ($rootScope.gradiation / element[0].duration) * element[0].currentTime

          $rootScope.timer.value = val
          scope.$apply(function () {
            scope.time = element[0].currentTime
            scope.duration = element[0].duration
          })

        })

        element.bind('volumechange', function () {
          if ($rootScope.volume) {
            $rootScope.volume.value = element[0].volume * 100
          }
        })
      }
    };
  });
