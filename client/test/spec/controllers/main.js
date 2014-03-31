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
      play: function () { player.paused = false; },
      pause: function () { player.paused = true; },
      stop: function () { },
      paused: true
    };
    spyOn(player, 'load');
    spyOn(player, 'play').andCallThrough();
    spyOn(player, 'pause').andCallThrough();

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

    var lst = scope.mediadirs[0];
    scope.enqueue(lst.files[1], event);
    expect(scope.song_queue.length).toBe(1);
    expect(event.stopPropagation.calls.length).toBe(1);

    scope.enqueue(lst.files[1], event);
    expect(scope.song_queue.length).toBe(1);
    expect(event.stopPropagation.calls.length).toBe(2);

    scope.dequeue(lst.files[1], event);
    expect(scope.song_queue.length).toBe(0);
    expect(event.stopPropagation.calls.length).toBe(3);

    scope.dequeue(lst.files[1], event);
    expect(scope.song_queue.length).toBe(0);
    expect(event.stopPropagation.calls.length).toBe(4);
  });

  it('can calculate files position in song_queue', function () {
    expect(scope.song_queue.length).toBe(0);

    var lst = scope.mediadirs[0];
    scope.enqueue(lst.files[0], event);
    scope.enqueue(lst.files[1], event);

    expect(scope.queue_pos(lst.files[1])).toBe(1);
    expect(scope.queue_pos(lst.files[0])).toBe(0);

    scope.dequeue(lst.files[0], event);

    expect(scope.queue_pos(lst.files[1])).toBe(0);
    expect(scope.queue_pos(lst.files[0])).toBe(-1);
  });

  it('selects next song in active list after "scope.next" call', function () {
    var lst = scope.mediadirs[0];
    scope.activate(lst);
    expect(scope.curr).toEqual(lst.files[0]);

    scope.next();
    expect(scope.curr).toEqual(lst.files[1]);

    scope.next();
    expect(scope.curr).toEqual(lst.files[1]);
  });

  it('selects first song after last if "repeat" is true', function () {
    var lst = scope.mediadirs[0];
    scope.activate(lst);
    scope.select(lst.files[1]);
    scope.repeat = true;
    scope.next();
    expect(scope.curr).toEqual(lst.files[0]);
  });

  it('selects previous song on "scope.prev" call', function () {
    var lst = scope.mediadirs[0];
    scope.activate(lst);
    expect(scope.curr).toEqual(lst.files[0]);

    scope.select(lst.files[1]);
    expect(scope.curr).toEqual(lst.files[1]);

    scope.prev();
    expect(scope.curr).toEqual(lst.files[0]);

    scope.prev();
    expect(scope.curr).toEqual(lst.files[0]);
  });

  it('selects last song when "prev" is called on first one', function () {
    var lst = scope.mediadirs[0];
    scope.activate(lst);

    expect(scope.curr).toEqual(lst.files[0]);
    scope.repeat = true;
    scope.prev();

    expect(scope.curr).toEqual(lst.files[1]);
  });

  it('changes the player state on play/pause/stop actions', function () {
    expect(scope.player.paused).toBe(true);
    expect(scope.paused).toBe(true);

    scope.play_pause();
    expect(scope.player.paused).toBe(false);
    expect(scope.paused).toBe(false);

    scope.play_pause();
    expect(scope.player.paused).toBe(true);
    expect(scope.paused).toBe(true);

    scope.play_pause();
    expect(scope.player.paused).toBe(false);
    expect(scope.paused).toBe(false);

    scope.stop();
    expect(scope.player.paused).toBe(true);
    expect(scope.paused).toBe(true);

    scope.play_pause();
    expect(scope.player.paused).toBe(false);
    expect(scope.paused).toBe(false);
  });

  it('changes currentTime on player object with actions ff nad rev', function () {
    scope.player.currentTime = 0;
    scope.player.duration = 25;

    scope.ff();
    scope.ff();
    scope.rev();
    expect(scope.player.currentTime).toBe(10);

    scope.ff();
    scope.ff();
    expect(scope.player.currentTime).toBe(25);

    scope.rev();
    scope.rev();
    expect(scope.player.currentTime).toBe(5);
    scope.rev();
    expect(scope.player.currentTime).toBe(0);
  });

  it('toggles the mute option both in player and scope on "mute" action', function () {
    expect(scope.muted).toBe(false);
    expect(scope.player.muted).toBeFalsy();

    scope.mute_toggle();
    expect(scope.muted).toBe(true);
    expect(scope.player.muted).toBe(true);

    scope.mute_toggle();
    expect(scope.muted).toBe(false);
    expect(scope.player.muted).toBe(false);
  });
});
