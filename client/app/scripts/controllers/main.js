'use strict';

angular.module('clientApp')
  .controller('MainCtrl', ['$scope', 'listsService', '$rootScope', function ($scope, listsService, $rootScope) {
    $scope.active = {}
    $scope.active_type = '';
    $scope.curr = ''
    $scope.song_queue = []
    $scope.new_list = {};
    $scope.mediabase = listsService.base
    $rootScope.gradiation = 1000
    $scope.init_volume = 0.1

    $scope.muted = false;
    $scope.random = false;
    $scope.repeat = false;
    $scope.edit = false;

    $scope.listview = 'files';
//  $scope.listview = 'lists';

    listsService.smscan().then(function (res) {
        listsService.scanned().then(function (res) {
            $scope.mediadirs = res.data;
        })
    })

    listsService.list_list().then(function (res) {
      $scope.lists = res.data;
    });

    $scope.activate = function (li) {
        $scope.active = li;
        $scope.active_type = $scope.listview;
        $scope.song_queue.splice(0, $scope.song_queue.length);
        $scope.select(li.files[0]);
    }

    $scope.select = function (f) {
        $scope.curr = f;
        $scope.player.src = (f ? $scope.mediabase+f.path : null);
        $scope.player.load();
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

    $scope.edit_toggle = function () {
      $scope.edit = !$scope.edit;
    }


    $scope.list_add = function () {
      if ($scope.new_list.name) {
        var tmp_list = $scope.new_list;
        $scope.new_list = {};
        tmp_list.files = [];
        $scope.lists.push(tmp_list);
        listsService.list_create(tmp_list).success(function (res) {
          tmp_list._id = res;
        });
      } else {
        alert('Cant insert a list with no name.');
      }
    };

    $scope.list_delete = function(li, $event) {
      $event.stopPropagation();
      if (li) {
        if (li._id) {
          listsService.list_delete(li._id).success(function(res) {
            arr_del($scope.lists, li);
          });
        } else {
          arr_del($scope.lists, li);
        }
      }
    };

    $scope.list_push = function(li, f) {
      if ($scope.edit && li && li._id && li.files.indexOf(f)<0) {
        li.files.push(f);
        listsService.list_put(li._id, li);
      }
    };

    $scope.list_pop = function(li, f, $event) {
      if (li && f) {
        arr_del(li.files, f);
        if (li._id) {
          listsService.list_put(li._id, li);
        }
      }
    };

    function arr_del(arr, obj) {
      var idx = arr.indexOf(obj);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    }
  }]);
