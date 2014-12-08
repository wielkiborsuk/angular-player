'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('angularPlayerApp'));

  var ListCtrl,
    hb,
    url,
    cont,
    list2,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, Dataservice) {
    hb = $httpBackend;
    scope = $rootScope.$new();
    scope.state = {song_queue: [], lists:{}, mediadirs:{}, path:{}};
    scope.flags = {};
    scope.activate_by_name = function () {};
    scope.select_by_name = function () {};
    url = Dataservice.endpoint_url;
    cont = $controller;

    hb.when('GET', url+'smscan/').respond(200);
    hb.when('GET', url+'scanned/').respond([{
      name: 'list1',
      path: '/path/to/list',
      files: [
        {name: 'name.mp3', path: '/path/to/list/name.mp3'},
        {name: 'name2.mp3', path: '/path/to/list/name2.mp3'}
      ]
    }]);
    list2 = {
      name: 'list2',
      files: [
        {name: 'hehe1.mp3', path: '/path/to/list/hehe1.mp3'},
        {name: 'hohoho.mp3', path: '/path/to/another/list/hohoho.mp3'}
      ],
      _id: '1'
    };
    hb.when('GET', url+'list/').respond([list2]);
    hb.when('POST', url+'list/').respond('123');
    hb.when('DELETE', url+'list/123').respond(200);
    hb.when('PUT', url+'list/1').respond(200);

    spyOn(scope, 'activate_by_name');
    spyOn(scope, 'select_by_name');

    ListCtrl = cont('ListCtrl', {
      $scope: scope
    });
    hb.flush();
  }));

  it('should check the server for the latest lists feed on creation', function () {
    scope.state.mediadirs = {};
    scope.state.lists = {};
    expect(Object.keys(scope.state.mediadirs).length).toBe(0);
    expect(Object.keys(scope.state.lists).length).toBe(0);
    hb.expectGET(url + 'scanned/');
    hb.expectGET(url + 'list/');
    cont('ListCtrl', {
      $scope: scope
    });
    hb.flush();

    expect(scope.state.mediadirs).toBeTruthy();
    expect(Object.keys(scope.state.mediadirs).length).toBe(1);
    expect(scope.state.lists).toBeTruthy();
    expect(Object.keys(scope.state.lists).length).toBe(1);
  });

  xit('should change application state accordingly, when list is activated', function () {
    scope.activate(list2);

    expect(scope.state.active).toEqual(list2);
    expect(scope.state.active_type).toEqual(scope.state.listview);
    expect(scope.state.song_queue.length).toEqual(0);
  });

  it('should call appropriate create/delete methods for lists', function () {
    scope.state.new_list = { name: 'new_list' };

    hb.expectPOST(url + 'list/');
    scope.list_add();
    hb.flush();

    var l = scope.state.lists.length;
    expect(scope.state.lists[l-1].name).toEqual('new_list');
    expect(scope.state.lists[l-1]._id).toEqual('123');
    expect(l).toBe(2);

    hb.expectDELETE(url + 'list/123');
    scope.list_delete(scope.state.lists[l-1]);
    hb.flush();

    l = scope.state.lists.length;
    expect(l).toBe(1);
    expect(scope.state.lists[l-1].name).not.toEqual('new_list');
    expect(scope.state.lists[l-1]._id).not.toEqual('123');
  });

  it('should modify list list_push and list_pop methods', function () {
    var file_entry = {name: 'test_file.mp3', path: '/path/to/test_file.mp3'};
    expect(scope.state.lists[0]).toEqual(list2);
    expect(list2.files.length).toBe(2);

    scope.flags.edit = true;
    hb.expectPUT(url + 'list/1');
    scope.list_push(list2, file_entry);
    hb.flush();

    expect(list2.files.length).toBe(3);
    expect(list2.files[list2.files.length-1].name).toEqual('test_file.mp3');

    //nothing should change here - the call to backend is not even made
    scope.list_push(list2, file_entry);

    expect(list2.files.length).toBe(3);
    expect(list2.files[list2.files.length-1].name).toEqual('test_file.mp3');

    hb.expectPUT(url + 'list/1');
    scope.list_pop(list2, file_entry);
    hb.flush();

    expect(list2.files.length).toBe(2);
    expect(list2.files[list2.files.length-1].name).not.toEqual('test_file.mp3');
  });
});
