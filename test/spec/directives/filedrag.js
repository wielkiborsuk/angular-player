'use strict';

describe('Directive: fileDrag', function () {

  // load the directive's module
  beforeEach(module('angularPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-drag></file-drag>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileDrag directive');
  }));
});
