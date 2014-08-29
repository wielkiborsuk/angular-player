'use strict';

describe('Directive: fileDrop', function () {

  // load the directive's module
  beforeEach(module('angularPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-drop></file-drop>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileDrop directive');
  }));
});
