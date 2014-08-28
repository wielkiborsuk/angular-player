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
      link: function postLink(scope, element, attrs) {
        var init_volume = attrs.initVolume || 0.1;
        Playerservice.controls.player = element;
        Playerservice.setVolume(init_volume * 100);

        element.bind('ended', function () {
          scope.$apply(function () {
            scope.next();
          });
        });

        element.bind('timeupdate', function () {
          scope.$apply(function () {
            Playerservice.seekUpdate();
          });
        });

        element.bind('progress', function () {
          scope.$apply(function () {
            Playerservice.seekUpdate();
          });
        });

        element.bind('volumechange', function () {
          Playerservice.setVolume(element[0].volume * 100);
        });
      }
    };
  });
