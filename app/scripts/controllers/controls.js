'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:ControlsCtrl
 * @description
 * # ControlsCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('ControlsCtrl', function ($scope, Playerservice, Listsservice) {
    $scope.gradation = Playerservice.gradation;

    $scope.rescan = function () {
      Listsservice.smscan().then(function (/*res*/) {
        Listsservice.scanned().then(function (res) {
          $scope.state.mediadirs = res.data;
        });
      });
    };

    $scope.next = function () {
      if ($scope.state.active.files) {
        var i = $scope.state.active.files.indexOf($scope.state.curr);

        if ($scope.state.song_queue.length>0) {
          $scope.select($scope.state.song_queue[0]);
        } else if ($scope.flags.random) {
          $scope.select($scope.state.active.files[Math.floor(Math.random() * $scope.state.active.files.length)]);
        } else {
          if (i > -1 && i+1<$scope.state.active.files.length) {
            $scope.select($scope.state.active.files[i+1]);
          } else if ($scope.flags.repeat) {
            $scope.select($scope.state.active.files[0]);
          }
        }
      }
    };

    $scope.prev = function () {
      if ($scope.state.active.files) {
        var i = $scope.state.active.files.indexOf($scope.state.curr);
        if ($scope.flags.random) {
          $scope.select($scope.state.active.files[Math.floor(Math.random() * $scope.state.active.files.length)]);
        } else {
          if (i > -1 && i > 0) {
            $scope.select($scope.state.active.files[i-1]);
          } else if ($scope.flags.repeat) {
            $scope.select($scope.state.active.files[$scope.state.active.files.length-1]);
          }
        }
      }
    };

    $scope.play_pause = function () {
      if (Playerservice.paused()) {
        Playerservice.play();
        $scope.flags.paused = false;
      } else {
        Playerservice.pause();
        $scope.flags.paused = true;
      }
    };

    $scope.stop = function () {
      Playerservice.pause();
      $scope.flags.paused = true;
      Playerservice.timeReset();
    };

    $scope.ff = function () {
      Playerservice.ff();
    };

    $scope.rev = function () {
      Playerservice.rev();
    };

    $scope.mute_toggle = function () {
      Playerservice.mute_toggle();
      $scope.flags.muted = Playerservice.muted();
    };

    $scope.random_toggle = function () {
      $scope.flags.random = !$scope.flags.random;
    };

    $scope.repeat_toggle = function () {
      $scope.flags.repeat = !$scope.flags.repeat;
    };

    $scope.edit_toggle = function () {
      $scope.flags.edit = !$scope.flags.edit;
    };
  });
