'use strict';

describe('Controller: ControlsCtrl', function () {
  var ControlsCtrl,
    playerservice,
    scope,
    dataservice,
    url,
    hb;

  // load the controller's module
  beforeEach(module('angularPlayerApp'));

  beforeEach(
    module(function($provide) {
      playerservice = {
        _paused: true,
        _muted: false,
        gradation: 1000,
        controls: {
          timeBar: null,
          volumeBar: null,
          player: null,
          timeBlocked: false,
          timeLabel: {time:0, duration:0}
        },
        play: function () { this._paused = false; },
        pause: function () { this._paused = true; },
        paused: function () { return this._paused; },
        mute_toggle: function () { this._muted = !this._muted; },
        muted: function () { return this._muted; },
        setVolume: function () {},
        seek: function () {},
        ff: function () {},
        rev: function () {},
        timeReset: function () {},
      };

      spyOn(playerservice, 'play').andCallThrough();
      spyOn(playerservice, 'pause').andCallThrough();
      spyOn(playerservice, 'timeReset');
      spyOn(playerservice, 'ff');
      spyOn(playerservice, 'rev');
      spyOn(playerservice, 'mute_toggle').andCallThrough();
      spyOn(playerservice, 'muted').andCallThrough();

      $provide.value('Playerservice', playerservice);
    })
  );


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Playerservice, Dataservice, $httpBackend) {
    hb = $httpBackend;
    dataservice = Dataservice;
    scope = $rootScope.$new();
    scope.state = {};
    scope.flags = {};
    url = dataservice.endpoint_url;

    ControlsCtrl = $controller('ControlsCtrl', {
      $scope: scope
    });

    hb.when('GET', url+'smscan/').respond(200);
    hb.when('GET', url+'scanned/').respond([{
      name: 'list1',
      path: '/path/to/list',
      files: [
        {name: 'name.mp3', path: '/path/to/list/name.mp3'},
        {name: 'name2.mp3', path: '/path/to/list/name2.mp3'}
      ]
    }]);
  }));

  it('should initialize controller fields', function () {
    expect(scope.timeLabel).toEqual({time:0, duration:0});
    expect(scope.gradation).toBe(playerservice.gradation);
  });

  it('calls backend (twice) on rescan action trigger', function () {
    hb.expectGET(url+'smscan/');
    hb.expectGET(url+'scanned/');
    scope.rescan();
    hb.flush();

    expect(scope.state.mediadirs).toBeTruthy();
  });

  it('starts and stops player on play/stop button presses', function () {
    expect(scope.state.paused).toBeFalsy();
    scope.play_pause();

    expect(playerservice.play).toHaveBeenCalled();
    expect(scope.flags.paused).toBeFalsy();
    scope.play_pause();

    expect(playerservice.pause).toHaveBeenCalled();
    expect(scope.flags.paused).toBeTruthy();

    scope.play_pause();
    scope.stop();
    expect(playerservice.play).toHaveBeenCalled();
    expect(playerservice.pause).toHaveBeenCalled();
    expect(scope.flags.paused).toBeTruthy();
    expect(playerservice.timeReset).toHaveBeenCalled();
  });

  it('should call apropriate helper methods in playerservice and change flags state', function () {
    expect(scope.flags.muted).toBeFalsy();
    scope.mute_toggle();
    expect(playerservice.mute_toggle).toHaveBeenCalled();
    expect(scope.flags.muted).toBeTruthy();
    scope.mute_toggle();
    expect(playerservice.mute_toggle).toHaveBeenCalled();
    expect(scope.flags.muted).toBeFalsy();

    scope.ff();
    expect(playerservice.ff).toHaveBeenCalled();
    scope.rev();
    expect(playerservice.rev).toHaveBeenCalled();

    expect(scope.flags.random).toBeFalsy();
    scope.random_toggle();
    expect(scope.flags.random).toBeTruthy();
    scope.random_toggle();
    expect(scope.flags.random).toBeFalsy();

    expect(scope.flags.repeat).toBeFalsy();
    scope.repeat_toggle();
    expect(scope.flags.repeat).toBeTruthy();
    scope.repeat_toggle();
    expect(scope.flags.repeat).toBeFalsy();

    expect(scope.flags.edit).toBeFalsy();
    scope.edit_toggle();
    expect(scope.flags.edit).toBeTruthy();
    scope.edit_toggle();
    expect(scope.flags.edit).toBeFalsy();
  });

  //FIXME - the 'next' and 'prev' methods are still pending, but require some more preparation :)
});
