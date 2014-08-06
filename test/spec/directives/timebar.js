'use strict';

describe('Directive: timeBar', function () {

  // load the directive's module
  beforeEach(module('angularPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<time-bar></time-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timeBar directive');
  }));
});
