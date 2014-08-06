'use strict';

/**
 * @ngdoc service
 * @name angularPlayerApp.Playerservice
 * @description
 * # Playerservice
 * Service in the angularPlayerApp.
 */
angular.module('angularPlayerApp')
  .service('Playerservice', function Playerservice() {
    return {
      gradation: 1000,
      controls: {
        timeBar: null,
        volumeBar: null,
        player: null
      },
      setVolume: function (vol) {
        this.controls.volumeBar.val(vol);
        this.controls.player.volume = 1.0*vol/100;
      },
      play: function () {
        this.controls.player.play();
      },
      pause: function () {
        this.controls.player.pause();
      },
      seek: function (val) {
        var time = val / this.gradation * this.controls.player.duration;
        this.controls.player.currentTime = time;
      },
      seekUpdate: function () {
        var player = this.controls.player[0];
        var dur = player.duration,
          time = player.currentTime,
          buff = player.buffered && player.buffered.length>0 ? player.buffered.end(0) : 0;
        var val = time * this.gradation / player.duration||1;
        this.controls.timeBar.val(val);

        var loaded = Math.min(buff/dur||0, 1);
        var played = Math.min(time/dur||0, loaded, 1);
        this.controls.timeBar.style.background = this.getGradient(played, loaded);
      },
      getGradient: function (played, loaded) {
        var res = '-webkit-gradient(linear, left top, right bottom, ';
        res += 'color-stop(0, #444444), color-stop({played}, #444444), ';
        res += 'color-stop({played}, #999999), color-stop({loaded}, #999999), ';
        res += 'color-stop({loaded}, #c2c2c2), color-stop(1, #c2c2c2))';
        return res.replace(/{played}/g, played).replace(/{loaded}/g, loaded);
        // .replace(/{played2}/g, played+0.01).replace(/{loaded2}/g, loaded+0.01);
      },
      getTime: function () {
        return this.controls.player[0].currentTime;
      },
      getDuration: function () {
        return this.controls.player[0].duration;
      }
    };
  });
