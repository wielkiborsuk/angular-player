'use strict';

describe('Directive: fDrop', function () {

  // load the directive's module
  beforeEach(module('clientApp'));

  var element,
    comp,
    dragenterEvent,
    dragleaveEvent,
    dragoverEvent,
    dropEvent,
    file,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.list_push = function () {};
    comp = $compile;
    file = {name:'hehe.mp3', path:'/path/to/hehe.mp3'};

    dragenterEvent = jQuery.Event('dragenter');
    dragleaveEvent = jQuery.Event('dragleave');
    dragoverEvent = jQuery.Event('dragover');
    dropEvent = jQuery.Event('drop');
    dropEvent.originalEvent = {dataTransfer: {
      getData: function (/*name*/) {
        return JSON.stringify(file);
      }
    }};
    spyOn(dropEvent.originalEvent.dataTransfer, 'getData').andCallThrough();
    spyOn(scope, 'list_push');
    spyOn(dropEvent, 'preventDefault');
    spyOn(dragenterEvent, 'preventDefault');
  }));

  it('should add all drop-related attributes and binds to element', function () {
    expect(scope.hasOwnProperty('dropData')).toBe(false);
    expect(scope.hasOwnProperty('dropStyle')).toBe(false);
    element = angular.element('<div f-drop></div>');
    element = comp(element)(scope);

    expect(scope.hasOwnProperty('dropData')).toBe(true);
    expect(scope.hasOwnProperty('dropStyle')).toBe(true);
    expect(scope.dragData).toBeFalsy();
    expect(scope.dragStyle).toBeFalsy();
  });

  it('should pass attribute values as parameters to directives scope', function () {
    scope.el = ['hohoho'];
    expect(scope.hasOwnProperty('dropData')).toBe(false);
    expect(scope.hasOwnProperty('dropStyle')).toBe(false);
    element = angular.element('<div f-drop drop="el" dropstyle="highlight"></div>');
    element = comp(element)(scope);

    expect(scope.dropData).toEqual(['hohoho']);
    expect(scope.dropStyle).toEqual('highlight');
  });

  it('should extract dropData from drop event and pass it to apropriate scope method', function () {
    scope.el = ['hohoho'];
    expect(scope.hasOwnProperty('dropData')).toBe(false);
    expect(scope.hasOwnProperty('dropStyle')).toBe(false);
    element = angular.element('<div f-drop drop="el" dropstyle="highlight"></div>');
    element = comp(element)(scope);

    element.triggerHandler(dragenterEvent);
    expect(element.hasClass('highlight')).toBe(true);
    expect(dragenterEvent.preventDefault).toHaveBeenCalled();

    element.triggerHandler(dropEvent);
    expect(element.hasClass('highlight')).toBe(false);
    expect(dropEvent.preventDefault).toHaveBeenCalled();
    expect(scope.list_push).toHaveBeenCalledWith(scope.el, file);
  });
});
