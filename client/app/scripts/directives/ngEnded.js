'use strict';

angular.module('clientApp')
  .directive('ngEnded', function () {
    return {
      link: function postLink(scope, element, attrs) {
        console.log(element)
      	element.bind('ended', function () {
      		scope.$apply(function () {
      			scope.next();
      		})
      	})

        // element.bind('playing', function () { scope.manifest() })
        // element.bind('pause', function () { scope.manifest() })
      }
    };
  });
