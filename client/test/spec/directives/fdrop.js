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
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    comp = $compile;

    dragenterEvent = jQuery.Event('dragenter');
    dragleaveEvent = jQuery.Event('dragleave');
    dragoverEvent = jQuery.Event('dragover');
    drop = jQuery.Event('drop');
  }));

  it('should make hidden element visible', function () {
    //element = angular.element('<f-drop></f-drop>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the fDrop directive');
  });
});
