'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MainCtrl,
    scope,
    httpBackend,
    dataService,
    url;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, _dataService_) {
    scope = $rootScope.$new();
    dataService = _dataService_;
    url = dataService.endpoint_url;
    httpBackend = $httpBackend;

    var list2 = {
      name: 'list2',
      files: [
        {name: 'hehe1.mp3', path: '/path/to/list/hehe1.mp3'},
        {name: 'hohoho.mp3', path: '/path/to/another/list/hohoho.mp3'}
      ],
      _id: '1'
    };

    httpBackend.when('GET', url+'smscan/').respond(200);
    httpBackend.when('GET', url+'scanned/').respond([{
      name: 'list1',
      path: '/path/to/list',
      files: [
        {name: 'hehe1.mp3', path: '/path/to/list/hehe1.mp3'},
        {name: 'hehe2.mp3', path: '/path/to/list/hehe2.mp3'}
      ]
    }]);
    httpBackend.when('GET', url+'list/').respond([list2]);
    httpBackend.when('POST', url+'list/').respond('1');

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
