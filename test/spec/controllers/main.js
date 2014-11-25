'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularPlayerApp'));

  var MainCtrl,
    sData,
    sPlayer,
    scope,
    file1,
    file2,
    event;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Dataservice, Playerservice) {
    sData = Dataservice;
    sPlayer = Playerservice;
    scope = $rootScope.$new();
    event = {
      stopPropagation: function () {}
    }
    spyOn(event, 'stopPropagation');

    spyOn(sPlayer, 'getVolume').andReturn(10);
    spyOn(sPlayer, 'getCurrentPath').andReturn('/path/to/file1.mp3');
    spyOn(sPlayer, 'paused').andReturn(true);
    spyOn(sPlayer, 'select');

    file1 = {name: 'file1.mp3', path: '/path/to/file1.mp3'}
    file2 = {name: 'file2.mp3', path: '/path/to/file2.mp3'}

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    scope.state.song_queue =  [file1];
  }));

  it('should calculate songs position in the queue', function () {
    expect(scope.queue_pos(file1)).toEqual(0);
    expect(scope.queue_pos(file2)).toEqual(-1);

    scope.state.song_queue.push(file2);
    expect(scope.queue_pos(file2)).toEqual(1);

    scope.state.song_queue.pop();
    expect(scope.queue_pos(file1)).toEqual(0);
    expect(scope.queue_pos(file2)).toEqual(-1);
  });

  it('should handle queue manipulations correctly', function () {
    expect(scope.queue_pos(file1)).toBe(0);
    expect(scope.queue_pos(file2)).toBe(-1);

    scope.enqueue(file2, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.queue_pos(file2)).toBe(1);

    scope.dequeue(file2, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.queue_pos(file2)).toBe(-1);

    scope.queue_toggle(file2, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.queue_pos(file2)).toBe(1);

    scope.queue_toggle(file2, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.queue_pos(file2)).toBe(-1);

    scope.dequeue(file1, event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(scope.queue_pos(file2)).toBe(-1);
    expect(scope.queue_pos(file1)).toBe(-1);
    expect(scope.state.song_queue.length).toBe(0);
  });

  it('should return apropriate values on "get" methods', function () {
    expect(scope.getMediabase()).toEqual(sData.mediabase);
    expect(scope.getGradation()).toEqual(sPlayer.gradation);
    expect(scope.getVolume()).toEqual(sPlayer.getVolume());
    expect(scope.getPaused()).toEqual(sPlayer.paused());
    expect(scope.getCurrentPath()).toEqual(sPlayer.getCurrentPath());

    expect(sPlayer.getVolume).toHaveBeenCalled();
    expect(sPlayer.paused).toHaveBeenCalled();
    expect(sPlayer.getCurrentPath).toHaveBeenCalled();
  });

  it('acts accordingly on a call to "select" method', function () {
    expect(scope.state.curr).toBeFalsy();
    expect(scope.queue_pos(file2)).toBe(-1);

    scope.select(file2);
    expect(scope.state.curr).toEqual(file2);
    expect(scope.queue_pos(file2)).toBe(-1);
    expect(scope.queue_pos(file1)).toBe(0);

    scope.select(file1);
    expect(scope.state.curr).toEqual(file1);
    expect(scope.queue_pos(file1)).toBe(-1);

    scope.enqueue(file2, event);
    scope.flags.repeat = true;
    expect(scope.queue_pos(file2)).toBe(0);

    scope.select(file2);
    expect(scope.state.curr).toEqual(file2);
    expect(scope.queue_pos(file2)).toBe(0);

    scope.enqueue(file1, event);
    expect(scope.queue_pos(file2)).toBe(0);
    expect(scope.queue_pos(file1)).toBe(1);

    scope.select(file2);
    expect(scope.state.curr).toEqual(file2);
    expect(scope.queue_pos(file2)).toBe(1);
    expect(scope.queue_pos(file1)).toBe(0);
  });
});
