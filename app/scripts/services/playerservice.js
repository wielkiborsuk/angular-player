'use strict';

/**
 * @ngdoc service
 * @name angularPlayerApp.Playerservice
 * @description
 * # Playerservice
 * Service in the angularPlayerApp.
 */
angular.module('angularPlayerApp')
  .service('Playerservice', function Playerservice(Dataservice) {
    return {
      gradation: 1000,
      controls: {
        timeBar: null,
        volumeBar: null,
        player: null,
        timeBlocked: false,
        timeLabel: {time:0, duration:0}
      },
      setVolume: function (vol) {
        if (!isNaN(vol)) {
          if (this.controls.volumeBar) {
            this.controls.volumeBar.val(vol);
          }
          this.controls.player[0].volume = 1.0*vol/100;
        }
      },
      play: function () {
        this.controls.player[0].play();
      },
      pause: function () {
        this.controls.player[0].pause();
      },
      paused: function () {
        return this.controls.player[0].paused;
      },
      mute_toggle: function () {
        this.controls.player[0].muted = !this.muted();
      },
      muted: function () {
        return this.controls.player[0].muted;
      },
      seek: function (val) {
        var time = val / this.gradation * this.getDuration();
        if (this.controls.player && !!this.controls.player[0].readyState) {
          this.controls.player[0].currentTime = Math.max(Math.min(time, this.getDuration()), 0);
        } else {
          this.seekUpdate();
        }
      },
      ff: function () {
        this.seek(this.gradation * (this.getTime() + 10) / this.getDuration());
      },
      rev: function () {
        this.seek(this.gradation * (this.getTime() - 10) / this.getDuration());
      },
      seekUpdate: function () {
        if (!this.controls.timeBlocked) {
          var player = this.controls.player[0];
          var dur = player.duration,
            time = player.currentTime,
            buff = player.buffered && player.buffered.length>0 ? player.buffered.end(0) : 0;
          var val = time * this.gradation / player.duration||1;
          this.controls.timeBar.val(val);

          var loaded = Math.min(buff/dur||0, 1);
          var played = Math.min(time/dur||0, loaded, 1);
          this.controls.timeBar[0].style.backgroundImage = this.getGradient(played, loaded);
          this.controls.timeLabel.time = time;
          this.controls.timeLabel.duration = dur;
        }
      },
      getGradient: function (played, loaded) {
        var res = '-webkit-gradient(linear, left top, right bottom, ';
        //res += 'color-stop(0, #444444), ';
        res += 'color-stop(0, #999999), ';
        //res += 'color-stop({played}, #444444), color-stop({played}, #999999), ';
        res += 'color-stop({loaded}, #999999), ';
        res += 'color-stop({loaded}, #c2c2c2), color-stop(1, #c2c2c2))';
        return res.replace(/{played}/g, played).replace(/{loaded}/g, loaded);
        // .replace(/{played2}/g, played+0.01).replace(/{loaded2}/g, loaded+0.01);
      },
      getTime: function () {
        return this.controls.player[0].currentTime || 0;
      },
      getDuration: function () {
        return this.controls.player[0].duration || 0;
      },
      getVolume: function () {
        return this.controls.player[0].volume || 0;
      },
      getCurrentPath: function () {
        return this.controls.player[0].src;
      },
      timeReset: function () {
        this.controls.player[0].currentTime = 0;
      },
      select: function (f) {
        this.controls.player[0].src = Dataservice.mediabase + f.path;
        this.controls.player.children()[0].src = Dataservice.mediabase + f.path;
        this.controls.player[0].play();
      },
      timeBlock: function (val) {
        this.controls.timeBlocked = val;
      }
    };
  });
