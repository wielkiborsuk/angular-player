'use strict';

/**
 * @ngdoc directive
 * @name angularPlayerApp.directive:timeBar
 * @description
 * # timeBar
 */
angular.module('angularPlayerApp')
  .directive('timeBar', function (Playerservice) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        Playerservice.controls.timeBar = element;

        element.bind('mouseup', function () {
          Playerservice.play();
          Playerservice.timeBlock(false);
        });

        element.bind('mousedown', function () {
          Playerservice.timeBlock(true);
          Playerservice.pause();
        });

        element.bind('change', function () {
          Playerservice.seek(element.val());
        });
      }
    };
  });
