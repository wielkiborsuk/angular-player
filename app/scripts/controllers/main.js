'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.active = {};
    $scope.active_type = '';
    $scope.curr = '';
    $scope.song_queue = [];
    $scope.new_list = {};
    $scope.mediadirs = {};
    $scope.lists = {};

    $scope.muted = false;
    $scope.random = false;
    $scope.repeat = false;
    $scope.edit = false;
    $scope.paused = true;

    $scope.listview = 'files';
//  $scope.listview = 'lists';
  });
