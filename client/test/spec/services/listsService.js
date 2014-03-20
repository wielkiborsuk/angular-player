'use strict';

describe('Service: listsservice', function () {

  beforeEach(module('clientApp'));

  var listsService;
  var dataService;
  var httpBackend;
  var url;
  beforeEach(inject(function (_listsService_, _dataService_, _$httpBackend_) {
    listsService = _listsService_;
    httpBackend = _$httpBackend_;
    dataService = _dataService_;
    url = dataService.endpoint_url;
    var list2 = {
      name: 'list2',
      files: [
        {name: 'hehe1.mp3', path: '/path/to/list/hehe1.mp3'},
        {name: 'hohoho.mp3', path: '/path/to/another/list/hohoho.mp3'}
      ],
      _id: '1'
    };

    httpBackend.when('GET', url+'scanned/').respond([{
      name: 'list1',
      path: '/path/to/list',
      files: [
        {name: 'hehe1.mp3', path: '/path/to/list/hehe1.mp3'},
        {name: 'hehe2.mp3', path: '/path/to/list/hehe2.mp3'}
      ]
    }]);
    httpBackend.when('GET', url+'smscan/').respond(200);
    httpBackend.when('POST', url+'rescan/').respond(200);

    httpBackend.when('GET', url+'list/').respond([list2]);
    httpBackend.when('POST', url+'list/').respond('1');
    httpBackend.when('GET', url+'list/1').respond(list2);
    httpBackend.when('PUT', url+'list/1').respond(200);
    httpBackend.when('DELETE', url+'list/1').respond(200);
  }));

  it('should be successfuly created', function () {
    expect(listsService).toBeTruthy();
  });

  it('should execute http calls to (re)scan song directory', function () {
    listsService.scanned().then(function (res) {
      var data = res.data;
      expect(data).toBeTruthy();
      expect(data[0]).toBeTruthy();
      expect(data[0].name).toEqual('list1');
      expect(data[0].path).toBeTruthy();
      expect(data[0].files.length).toEqual(2);
    });
    listsService.rescan('path').then(function (res) {
      expect(res.status).toBe(200);
    });
    listsService.smscan().then(function (res) {
      expect(res.status).toBe(200);
    });

    httpBackend.flush();
    httpBackend.expectGET(url+'smscan/');
    httpBackend.expectGET(url+'scanned/');
    httpBackend.expectPOST(url+'rescan/', 'path');
  });

  it('should execute CRUD calls to lists service on the backend', function () {
    listsService.list_list().then(function (res) {
      var data = res.data;
      expect(res.status).toBe(200);
      expect(data).toBeTruthy();
      expect(data[0]).toBeTruthy();
      expect(data[0].name).toEqual('list2');
      expect(data[0].path).toBeFalsy();
      expect(data[0]._id).toEqual('1');
      expect(data[0].files.length).toBe(2);
    });
    listsService.list_create({}).then(function (res) {
      expect(res.status).toBe(200);
      expect(res.data).toEqual('1');
    });

    listsService.list_get('1').then(function (res) {
      var data = res.data;
      expect(res.status).toBe(200);
      expect(data).toBeTruthy();
      expect(data.name).toEqual('list2');
      expect(data.path).toBeFalsy();
      expect(data._id).toEqual('1');
      expect(data.files.length).toBe(2);
    });
    listsService.list_put('1', {}).then(function (res) {
      expect(res.status).toBe(200);
    });
    listsService.list_delete('1').then(function (res) {
      expect(res.status).toBe(200);
    });

    httpBackend.flush();

    httpBackend.expectGET(url+'list/');
    httpBackend.expectGET(url+'list/1');
    httpBackend.expectPOST(url+'list/', {});
    httpBackend.expectPUT(url+'list/1', {});
    httpBackend.expectDELETE(url+'list/1');
  });

});
