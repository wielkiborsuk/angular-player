'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:ControlsCtrl
 * @description
 * # ControlsCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('ControlsCtrl', function ($scope, Playerservice) {
    $scope.gradation = Playerservice.gradation;

    $scope.rescan = function () {
      listsService.smscan().then(function (/*res*/) {
        listsService.scanned().then(function (res) {
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
      if ($scope.player.paused) {
        $scope.player.play();
        $scope.flags.paused = false;
      } else {
        $scope.player.pause();
        $scope.flags.paused = true;
      }
    };

    $scope.stop = function () {
      $scope.player.pause();
      $scope.flags.paused = true;
      $scope.player.currentTime = 0;
    };

    $scope.ff = function () {
      $scope.player.currentTime = Math.min($scope.player.currentTime + 10, $scope.player.duration);
    };

    $scope.rev = function () {
      $scope.player.currentTime = Math.max(0, $scope.player.currentTime - 10);
    };

    $scope.mute_toggle = function () {
      $scope.player.muted = !$scope.player.muted;
      $scope.flags.muted = $scope.player.muted;
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
