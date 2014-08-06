'use strict';

/**
 * @ngdoc directive
 * @name angularPlayerApp.directive:player
 * @description
 * # player
 */
angular.module('angularPlayerApp')
  .directive('player', function (Playerservice) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        Playerservice.controls.player = element;
        Playerservice.setVolume(scope.init_volume);

        element.bind('ended', function () {
          scope.$apply(function () {
            scope.next();
          });
        });

        element.bind('timeupdate', function () {
          Playerservice.seekUpdate();
        });

        element.bind('progress', function () {
          Playerservice.seekUpdate();
        });

        element.bind('volumechange', function () {
          Playerservice.setVolume(element[0].volume * 100);
        });
      }
    };
  });
