'use strict';

describe('Service: Playerservice', function () {

  // load the service's module
  beforeEach(module('angularPlayerApp'));

  // instantiate service
  var Playerservice,
  player,
  tBar,
  vBar;

  beforeEach(inject(function (_Playerservice_) {
    Playerservice = _Playerservice_;

    vBar = {
      _val: 10,
      val: function (v) { this._val = v || this._val; return this._val; }
    };

    spyOn(vBar, 'val').andCallThrough();

    tBar = {
      0: { style: { backgroundImage: 'image' } },
      _val: 0,
      val: function (v) { this._val = v || this._val; return this._val; }
    };

    spyOn(tBar, 'val').andCallThrough();

    player = [{
      play: function () { this.paused = false; },
      pause: function () { this.paused = true; },

      src: 'http://url/to/current/file.mp3',
      currentTime: 0,
      duration: 0,
      readyState: 0,
      muted: false,
      paused: true,
      volume: 0.1
    }];

    spyOn(player[0], 'play').andCallThrough();
    spyOn(player[0], 'pause').andCallThrough();

    Playerservice.controls.player = player;
    Playerservice.controls.volumeBar = vBar;
    Playerservice.controls.timeBar = tBar;
  }));

  it('initialize Playerservice with apropriate values', function () {
    expect(!!Playerservice).toBe(true);
    expect(Playerservice.gradation).toBe(1000);
    expect(Playerservice.controls.timeBlocked).toBe(false);
    expect(Playerservice.controls.timeLabel.duration).toBe(0);
    expect(Playerservice.controls.timeBar).toBeTruthy();
    expect(Playerservice.controls.volumeBar).toBeTruthy();
    expect(Playerservice.controls.player).toBeTruthy();
  });

  it('handles volume changes as it should (regardless if it has volumeBar reference)', function () {
    expect(player[0].volume).toBe(0.1);
    expect(vBar.val()).toBe(10);

    Playerservice.setVolume(20);
    expect(vBar.val()).toBe(20);
    expect(player[0].volume).toBe(0.2);
    expect(vBar.val.calls.length).toBe(3);
    expect(Playerservice.getVolume()).toBe(0.2);

    Playerservice.controls.volumeBar = null;
    Playerservice.setVolume(30);
    expect(vBar.val()).toBe(20);
    expect(player[0].volume).toBe(0.3);
    expect(vBar.val.calls.length).toBe(4);
    expect(Playerservice.getVolume()).toBe(0.3);
  });

  it('should use the play/pause on player object', function () {
    expect(player[0].paused).toBe(true);

    Playerservice.play();
    expect(player[0].play.calls.length).toBe(1);
    expect(player[0].paused).toBe(false);

    Playerservice.pause();
    expect(player[0].pause.calls.length).toBe(1);
    expect(player[0].paused).toBe(true);

    Playerservice.play();
    expect(player[0].play.calls.length).toBe(2);
    expect(player[0].paused).toBe(false);
  });

  it('should mute/unmute on "toggle" button', function () {
    expect(Playerservice.muted()).toBeFalsy();

    Playerservice.mute_toggle();
    expect(Playerservice.muted()).toBeTruthy();

    Playerservice.mute_toggle();
    expect(Playerservice.muted()).toBeFalsy();
  });

  it('should manipulate time on player object as well as time bar', function () {
    expect(Playerservice.getDuration()).toBe(0);
    expect(Playerservice.getTime()).toBe(0);

    player[0].readyState = 1;
    player[0].duration = 200;
    Playerservice.seek(Playerservice.gradation/10);

    expect(Playerservice.getDuration()).toBe(200);
    expect(Playerservice.getTime()).toBe(20);

    Playerservice.ff();
    Playerservice.ff();

    expect(Playerservice.getTime()).toBe(40);

    Playerservice.rev();

    expect(Playerservice.getTime()).toBe(30);

    Playerservice.timeReset();

    expect(Playerservice.getTime()).toBe(0);
    expect(Playerservice.getDuration()).toBe(200);
  });
});
