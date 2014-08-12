'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('MainCtrl', function ($scope, $sce, Dataservice, Playerservice) {
    $scope.active = {};
    $scope.active_type = '';
    $scope.curr = '';
    $scope.song_queue = [];
    $scope.new_list = {};
    $scope.mediadirs = {};
    $scope.lists = {};

    $scope.state = {
      listview: 'files',
      //listview: 'lists',
      active: {},
      active_type: '',
      curr: '',
      song_queue: [],
      new_list: {},
      mediadirs: {},
      lists: {}
    };

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
  });
