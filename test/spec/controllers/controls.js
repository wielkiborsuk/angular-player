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
        mute_toggle: function () {},
        muted: function () { return false; },
        setVolume: function () {},
        seek: function () {},
        ff: function () {},
        rev: function () {},
      };

      spyOn(playerservice, 'play').andCallThrough();
      spyOn(playerservice, 'pause').andCallThrough();

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
  });
});
