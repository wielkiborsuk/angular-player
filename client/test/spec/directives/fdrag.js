'use strict';

describe('Directive: fDrag', function () {

  // load the directive's module
  beforeEach(module('clientApp'));

  var element,
    comp,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    comp = $compile;
  }));

  it('should add all drag-related attributes and binds to an object', function () {
    expect(scope.hasOwnProperty('dragData')).toBe(false);
    expect(scope.hasOwnProperty('dragStyle')).toBe(false);
    element = angular.element('<div f-drag drag="el"></div>');
    element = comp(element)(scope);

    expect(element.attr('draggable')).toEqual('true');
    expect(scope.hasOwnProperty('dragData')).toBe(true);
    expect(scope.hasOwnProperty('dragStyle')).toBe(true);
    expect(scope.dragData).toBeFalsy();
    expect(scope.dragstyle).toBeFalsy();
  });

  it('should pass attribute values as parameters to directives scope', function () {
    scope.el = 'hohoho';
    expect(scope.hasOwnProperty('dragData')).toBe(false);
    expect(scope.hasOwnProperty('dragStyle')).toBe(false);
    element = angular.element('<div f-drag drag="el" dragstyle="highlight"></div>');
    element = comp(element)(scope);

    expect(scope.dragData).toEqual('hohoho');
    expect(scope.dragStyle).toEqual('highlight');
  });

  it('should pass dragData to the dragstart event', function () {
    scope.el = 'hohoho';
    expect(scope.hasOwnProperty('dragData')).toBe(false);
    expect(scope.hasOwnProperty('dragStyle')).toBe(false);
    element = angular.element('<div f-drag drag="el" dragstyle="highlight"></div>');
    element = comp(element)(scope);

    element.triggerHandler('dragstart');
  });
});
