'use strict';

describe('Directive: perfectScrollbar', function () {

  // load the directive's module
  beforeEach(module('clientApp'));

  var element,
    scope,
    compile;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('should modify the element, adding scrollbar specific class and children', function () {
    element = angular.element('<div perfect-scrollbar></div>');
    element = compile(element)(scope);
    expect(element.hasClass('ps-container')).toBeTruthy();
    expect(element.find('[class="ps-scrollbar-x-rail"]')).toBeTruthy();
    expect(element.find('[class="ps-scrollbar-x"]')).toBeTruthy();
    expect(element.find('[class="ps-scrollbar-y-rail"]')).toBeTruthy();
    expect(element.find('[class="ps-scrollbar-y"]')).toBeTruthy();
  });
});
