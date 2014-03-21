'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MainCtrl,
    scope,
    httpBackend,
    dataService,
    cont,
    compile,
    player,
    event,
    url;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, _dataService_, $compile) {
    scope = $rootScope.$new();
    dataService = _dataService_;
    url = dataService.endpoint_url;
    cont = $controller;
    compile = $compile;
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

    player = {
      load: function () { },
      play: function () { },
      pause: function () { },
      stop: function () { }
    };
    spyOn(player, 'load');

    event = {
      stopPropagation: function () {}
    };
    spyOn(event, 'stopPropagation');

    httpBackend.flush();
    scope.player = player;
  }));

  it('should initialize mediadirs and lists arrays on construction', function () {
    httpBackend.expectGET(url+'smscan/');
    httpBackend.expectGET(url+'list/');
    httpBackend.expectGET(url+'scanned/');
    cont('MainCtrl', { $scope: scope });
    httpBackend.flush();

    expect(scope.mediadirs).toBeTruthy();
    expect(scope.lists).toBeTruthy();
  });

  it('can activate a certain playlist and autoselect the first song', function () {
    scope.activate(scope.mediadirs[0]);
    expect(scope.player.src).toBeTruthy();
    expect(scope.player.src).toEqual(scope.mediabase+scope.mediadirs[0].files[0].path);
    expect(scope.player.load).toHaveBeenCalled();
  });

  it('can select other songs with the "select" action', function () {
    scope.activate(scope.mediadirs[0]);
    expect(player.src).toBeTruthy();
    expect(player.load.calls.length).toBe(1);

    var f = scope.mediadirs[0].files[1];
    scope.select(f);
    expect(scope.curr).toEqual(f);
    expect(player.src).toEqual(scope.mediabase+f.path);
    expect(player.load.calls.length).toBe(2);
  });

  it('can handle queue toggle with event propagation stop', function () {
    expect(scope.song_queue).toBeTruthy();
    expect(scope.song_queue.length).toBe(0);

    var lst = scope.mediadirs[0];
    scope.queue_toggle(lst.files[0], event);
    expect(scope.song_queue.length).toBe(1);
    expect(event.stopPropagation.calls.length).toBe(1);

    scope.enqueue(lst.files[1], event);
    expect(scope.song_queue.length).toBe(2);
    expect(event.stopPropagation.calls.length).toBe(2);
    expect(scope.song_queue[1]).toEqual(lst.files[1]);

    scope.dequeue(lst.files[0], event);
    expect(scope.song_queue.length).toBe(1);
    expect(event.stopPropagation.calls.length).toBe(3);
    expect(scope.song_queue[0]).toEqual(lst.files[1]);

    scope.queue_toggle(lst.files[1], event);
    expect(scope.song_queue.length).toBe(0);
    expect(event.stopPropagation.calls.length).toBe(4);
  });

  it('ignores multiple enqueue and dequeue requests for same song', function () {
    expect(scope.song_queue).toBeTruthy();
    expect(scope.song_queue.length).toBe(0);


    expect(1).toBe(2);
  });
});
