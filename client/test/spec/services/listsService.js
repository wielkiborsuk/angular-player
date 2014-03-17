'use strict';

describe('Service: listsservice', function () {

  beforeEach(module('clientApp'));

  var listsService;
  var dataService;
  var httpBackend;
  beforeEach(inject(function (_listsService_, _dataService_, _$httpBackend_) {
    listsService = _listsService_;
    httpBackend = _$httpBackend_;
    dataService = _dataService_;
    var url = dataService.endpoint_url;
    httpBackend.when('GET', url+'scanned/').respond({});
    httpBackend.when('GET', url+'smscan/').respond({});
    httpBackend.when('GET', url+'list/').respond({});
    httpBackend.when('GET', url+'list/'+).respond({});
    httpBackend.when('GET', url+'scanned/').respond({});
    httpBackend.when('GET', url+'scanned/').respond({});
  }));

  it('should be successfuly created', function () {
     expect(listsService).toBeTruthy();
  });

  it('should execute calls to (re)scan song directory', function () {
  });

});
