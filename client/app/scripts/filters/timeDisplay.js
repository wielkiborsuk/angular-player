'use strict';

angular.module('clientApp')
  .filter('timeDisplay', function () {
    function padding(pad, str) {
      str = str.toString();
      return pad.substring(0, Math.max(0, pad.length - str.length)) + str;
    }

    return function (input) {
      var s = Math.round(input);
      var m = Math.floor(s / 60);
      s = s % 60;

      return padding('00', m) + ':' + padding('00', s);
    };
  });
