'use strict';

angular.module('clientApp')
  .filter('timeDisplay', function () {
    function padding(pad, str) {
      str = str.toString();
      return pad.substring(0, Math.max(0, pad.length - str.length)) + str;
    }

    return function (input) {
      var s = Math.round(Math.abs(input));
      var m = Math.floor(s / 60 % 60);
      var h = Math.floor(s / 3600);
      s = s % 60;

      s = (isNaN(s) ? 0 : s);
      m = (isNaN(m) ? 0 : m);
      h = (isNaN(h) ? 0 : h);

      return (h ? padding('00', h)+':' : '') +  padding('00', m) + ':' + padding('00', s);
    };
  });
