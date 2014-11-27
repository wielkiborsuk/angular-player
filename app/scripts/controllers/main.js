'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('MainCtrl', function ($scope, $sce, $route, $rootScope, $routeParams, $location, Dataservice, Playerservice) {
    var original = $location.path;
    $location.path = function (path, reload) {
      if (reload === false) {
        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
          $route.current = lastRoute;
          un();
        });
      }
      return original.apply($location, [path]);
    };

    $scope.state = Dataservice.state;
    $scope.state.listview = $routeParams.type || 'files';
    $scope.state.path = {
      type: $routeParams.type,
      list: $routeParams.list,
      song: $routeParams.song
    }

    $scope.flags = {
      muted: false,
      random: false,
      repeat: false,
      edit: false,
      paused: true
    };

    $scope.queue_toggle = function (f, $event) {
      if ($scope.queue_pos(f)>-1) {
        $scope.dequeue(f, $event);
      } else {
        $scope.enqueue(f, $event);
      }
    };

    $scope.enqueue = function (f, $event) {
      if ($scope.state.song_queue.indexOf(f)<0) {
        $scope.state.song_queue.push(f);
      }
      $event.stopPropagation();
    };

    $scope.dequeue = function (f, $event) {
      if ($scope.state.song_queue.indexOf(f)>-1) {
        $scope.state.song_queue.splice($scope.queue_pos(f), 1);
      }
      $event.stopPropagation();
    };

    $scope.queue_pos = function (f) {
      return $scope.state.song_queue.indexOf(f);
    };

    $scope.getMediabase = function() {
      return Dataservice.mediabase;
    };

    $scope.getGradation = function() {
      return Playerservice.gradation;
    };

    $scope.getVolume = function () {
      return Playerservice.getVolume();
    };

    $scope.getPaused = function () {
      return Playerservice.paused();
    };

    $scope.getCurrentPath = function () {
      return Playerservice.getCurrentPath();
    };

    $scope.tab_select = function (name) {
      $scope.state.listview = name;
      $scope.state.path.type = name;
      $location.path('/'+name+'/', false);
    };

    $scope.activate_by_name = function (name) {
      var arr = ($scope.state.listview=='files' ? $scope.state.mediadirs : $scope.state.lists);
      for (var i=0; i<arr.length; i++) {
        var t = arr[i];
        if (t.name == name) {
          $scope.activate(t);
          break;
        }
      }
    };

    $scope.activate = function (li) {
      $scope.state.active = li;
      $scope.state.active_type = $scope.state.listview;
      $scope.state.song_queue.splice(0, $scope.state.song_queue.length);
      $scope.state.path.list = li.name;
      $location.path('/'+$scope.state.path.type+'/'+li.name+'/', false);
    };

    $scope.select_by_name = function (name) {
      if ($scope.state.active && $scope.state.active.files && name) {
        var arr = $scope.state.active.files;
        for (var i=0; i<arr.length; i++) {
          var t = arr[i];
          if (t.name == name) {
            $scope.select(t);
            break;
          }
        }
      }
    };

    $scope.select = function (f) {
      $scope.state.curr = f;
      Playerservice.select(f);
      if ($scope.queue_pos(f)>-1) {
        $scope.state.song_queue.splice($scope.queue_pos(f), 1);
        if ($scope.flags.repeat) {
          $scope.state.song_queue.push(f);
        }
      }
      $scope.state.path.song = f.name;
      $location.path('/'+$scope.state.path.type+'/'+$scope.state.path.list+'/'+f.name+'/', false);
    };
  });
