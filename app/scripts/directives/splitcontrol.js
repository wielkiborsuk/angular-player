'use strict';

/**
 * @ngdoc directive
 * @name angularPlayerApp.directive:splitControl
 * @description
 * # splitControl
 */
angular.module('angularPlayerApp')
  .directive('splitControl', function () {
    return {
      template: '<div draggable="true">&nbsp;</div>',
      restrict: 'E',
      transclude: true,
      replace: true,
      link: function postLink(scope, element/*, attrs*/) {
        var parent = element.parent();
        var count = 0;

        element.bind('drag', function (evt) {
          count += 1;
          var wid = parent.innerWidth() - 30;
          var x = evt.originalEvent.pageX-15;
          if (!!wid && !!x && !(count % 2)) {
            var prop = (wid-x)/x;
            element.next().css('flex', ''+prop+' '+prop+' 0');
          }
        });
      }
    };
  });
