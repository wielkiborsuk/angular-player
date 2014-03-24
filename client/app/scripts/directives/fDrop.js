'use strict';

angular.module('clientApp')
  .directive('fDrop', function () {
    function dragEnter(evt, element, dropStyle) {
      evt.preventDefault();
      element.addClass(dropStyle);
    };
    function dragLeave(evt, element, dropStyle) {
      element.removeClass(dropStyle);
    };
    function dragOver(evt) {
      evt.preventDefault();
    };
    function drop(evt, element, dropStyle) {
      evt.preventDefault();
      element.removeClass(dropStyle);
    };

    return {
      restrict: 'A',
      link: function(scope, element, attrs)  {
        scope.dropData = scope[attrs["drop"]];
        scope.dropStyle = attrs["dropstyle"];
        element.bind('dragenter', function(evt) {
          dragEnter(evt, element, scope.dropStyle);
        });
        element.bind('dragleave', function(evt) {
          dragLeave(evt, element, scope.dropStyle);
        });
        element.bind('dragover', dragOver);
        element.bind('drop', function(evt) {
          drop(evt, element, scope.dropStyle);
          var dragged = JSON.parse(evt.originalEvent.dataTransfer.getData('file'));
          scope.list_push(scope.dropData, dragged);
        });
      }
    };
  });
