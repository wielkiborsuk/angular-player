'use strict';

angular.module('clientApp')
  .directive('player', function ($rootScope) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        // console.log(element)
        $rootScope.player = element[0];
        $rootScope.player.volume = scope.init_volume;
        var getGradient = function(played, loaded) {
          var res = '-webkit-gradient(linear, left top, right bottom, ';
          res += 'color-stop(0, #444444), color-stop({played}, #444444), ';
          res += 'color-stop({played}, #999999), color-stop({loaded}, #999999), ';
          res += 'color-stop({loaded}, #c2c2c2), color-stop(1, #c2c2c2))';
          return res.replace(/{played}/g, played).replace(/{loaded}/g, loaded);
            // .replace(/{played2}/g, played+0.01).replace(/{loaded2}/g, loaded+0.01);
        };

        var seekUpdate = function (player, seekbar) {
          var dur = player.duration,
              time = player.currentTime,
              buff = player.buffered && player.buffered.length>0 ? player.buffered.end(0) : 0;

          var loaded = Math.min(buff/dur||0, 1);
          var played = Math.min(time/dur||0, loaded, 1);
          seekbar.style.background = getGradient(played, loaded);
        };

        element.bind('ended', function () {
          scope.$apply(function () {
            scope.next();
          });
        });

        element.bind('timeupdate', function () {
          var val = ($rootScope.gradiation / element[0].duration || 1) * element[0].currentTime;

          $rootScope.timer.value = val;
          scope.$apply(function () {
            scope.time = element[0].currentTime;
            scope.duration = element[0].duration;
          });
          seekUpdate($rootScope.player, $rootScope.timer);
        });

        element.bind('progress', function () {
          seekUpdate($rootScope.player, $rootScope.timer);
        });

        element.bind('volumechange', function () {
          if ($rootScope.volume) {
            $rootScope.volume.value = element[0].volume * 100;
          }
        });
      }
    };
  });
