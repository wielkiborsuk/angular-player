'use strict';

angular.module('clientApp')
  .directive('perfectScrollbar', function ($parse, $timeout) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attr) {
        $elem.perfectScrollbar({
          wheelSpeed: $parse($attr.wheelSpeed)() || 50,
          wheelPropagation: $parse($attr.wheelPropagation)() || false,
          minScrollbarLength: $parse($attr.minScrollbarLength)() || false,
          useBothWheelAxes: $parse($attr.useBothWheelAxes)() || false,
          suppressScrollX: $parse($attr.suppressScrollX)() || false,
          suppressScrollY: $parse($attr.suppressScrollY)() || false
        });

        if ($attr.refreshOnChange) {
          $scope.$watch($attr.refreshOnChange, function(/*newVal, oldVal*/) {
            // I'm not crazy about setting timeouts but it sounds like thie is unavoidable per
            // http://stackoverflow.com/questions/11125078/is-there-a-post-render-callback-for-angular-js-directive
            $timeout(function() { $elem.perfectScrollbar('update'); }, 10);
          });
        }

        //if the above listening solution stops working for some reason, this is always a workaround :)
        //setInterval(function () { $elem.perfectScrollbar('update'); }, 500);
      }
    };
  });
