'use strict';

/**
 * @ngdoc directive
 * @name angularPlayerApp.directive:volumeBar
 * @description
 * # volumeBar
 */
angular.module('angularPlayerApp')
  .directive('volumeBar', function (Playerservice) {
    return {
      link: function postLink(scope, element/*, attrs*/) {
        Playerservice.controls.volumeBar = element;

        element.bind('change', function () {
          Playerservice.setVolume(element.val());
        });
      }
    };
  });
