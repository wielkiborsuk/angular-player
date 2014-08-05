'use strict';

angular.module('clientApp')
  .directive('fDrag', function () {
    function dragStart(evt, element, dragStyle, dragData) {
      element.addClass(dragStyle);
      evt.originalEvent.dataTransfer.setData('file', JSON.stringify(dragData));
      evt.originalEvent.dataTransfer.effectAllowed = 'move';
    }
    function dragEnd(evt, element, dragStyle) {
      element.removeClass(dragStyle);
    }

    return {
      //restrict: 'A',
      link: function postLink(scope, element, attrs) {
        attrs.$set('draggable', 'true');
        scope.dragData = scope[attrs.drag];
        scope.dragStyle = attrs.dragstyle;
        element.bind('dragstart', function(evt) {
          dragStart(evt, element, scope.dragStyle, scope.dragData);
        });
        element.bind('dragend', function(evt) {
          dragEnd(evt, element, scope.dragStyle);
        });
      }
    };
  });
