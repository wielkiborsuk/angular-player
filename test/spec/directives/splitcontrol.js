'use strict';

describe('Directive: splitControl', function () {

  // load the directive's module
  beforeEach(module('angularPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make element draggable', inject(function ($compile) {
    element = angular.element('<split-control></split-control>');
    element = $compile(element)(scope);
    console.log(element)
    expect(element.attr('draggable')).toBeTruthy();
  }));
});
