'use strict';

describe('Directive: volumeBar', function () {

  // load the directive's module
  beforeEach(module('angularPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<volume-bar></volume-bar>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the volumeBar directive');
  }));
});
