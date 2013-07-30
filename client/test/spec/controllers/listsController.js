'use strict';

describe('Controller: ListscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ListscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListscontrollerCtrl = $controller('ListscontrollerCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
