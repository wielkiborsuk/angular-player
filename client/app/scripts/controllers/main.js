'use strict';

angular.module('clientApp')
  .controller('MainCtrl', ['$scope', 'listsService', '$rootScope', function ($scope, listsService, $rootScope) {
    $scope.active = {}
    $scope.curr = ''
    $scope.song_queue = []
    $scope.mediabase = listsService.base
    $rootScope.gradiation = 1000
    $scope.init_volume = 0.1

    $scope.muted = false
    $scope.random = false
    $scope.repeat = false

    listsService.smscan().then(function (res) {
        listsService.lists().then(function (res) {
            $scope.lists = res.data;
        })
    })

    $scope.activate = function (li) {
        $scope.active = li;
        $scope.song_queue.splice(0, $scope.song_queue.length);
        $scope.select(li.files[0]);
    }

    $scope.select = function (f) {
        $scope.curr = f;
        $scope.player.src = $scope.mediabase+$scope.active.path+'/'+f;
        $scope.player.load();
        $scope.player = $scope.player;
        if ($scope.queue_pos(f)>-1) {
          $scope.song_queue.splice($scope.queue_pos(f), 1);
          if ($scope.repeat) {
            $scope.song_queue.push(f);
          }
        }
    }

    $scope.queue_toggle = function (f, $event) {
      if ($scope.queue_pos(f)>-1) {
        $scope.dequeue(f, $event);
      } else {
        $scope.enqueue(f, $event);
      }
    }

    $scope.enqueue = function (f, $event) {
      if ($scope.song_queue.indexOf(f)<0) {
        $scope.song_queue.push(f);
      }
      $event.stopPropagation();
    }

    $scope.dequeue = function (f, $event) {
      if ($scope.song_queue.indexOf(f)>-1) {
        $scope.song_queue.splice($scope.queue_pos(f), 1);
      }
      $event.stopPropagation();
    }

    $scope.queue_pos = function (f) {
      return $scope.song_queue.indexOf(f);
    }

    $scope.manifest = function () {
        alert('this is the manifest')
    }

    $scope.next = function () {
      if ($scope.active.files) {
        var i = $scope.active.files.indexOf($scope.curr);

        if ($scope.song_queue.length>0) {
          $scope.select($scope.song_queue[0]);
        } else if ($scope.random) {
          $scope.select($scope.active.files[Math.floor(Math.random() * $scope.active.files.length)])
        } else {
          if (i > -1 && i+1<$scope.active.files.length) {
            $scope.select($scope.active.files[i+1])
          } else if ($scope.repeat) {
            $scope.select($scope.active.files[0])
          }
        }
      }
    }

    $scope.prev = function () {
      if ($scope.active.files) {
        var i = $scope.active.files.indexOf($scope.curr);
        if ($scope.random) {
          $scope.select($scope.active.files[Math.floor(Math.random() * $scope.active.files.length)])
        } else {
          if (i > -1 && i > 0) {
            $scope.select($scope.active.files[i-1])
          }
        }
      }
    }

    $scope.play_pause = function () {
      if ($scope.player.paused) {
        $scope.player.play()
        $scope.paused = false
      } else {
        $scope.player.pause()
        $scope.paused = true
      }
    }

    $scope.stop = function () {
      $scope.player.pause()
      $scope.player.currentTime = 0
    }

    $scope.ff = function () {
      $scope.player.currentTime = Math.min($scope.player.currentTime + 10, $scope.player.duration)
    }

    $scope.rev = function () {
      $scope.player.currentTime = Math.max(0, $scope.player.currentTime - 10)
    }

    $scope.mute_toggle = function () {
      $scope.player.muted = !$scope.player.muted
      $scope.muted = $scope.player.muted
    }

    $scope.random_toggle = function () {
      $scope.random = !$scope.random
    }

    $scope.repeat_toggle = function () {
      $scope.repeat = !$scope.repeat
    }
  }]);
