'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('ListCtrl', function ($scope, Listsservice/*, Playerservice*/) {
    //Listsservice.smscan().then(function (res) {
      //Listsservice.scanned().then(function (res) {
        //$scope.mediadirs = res.data;
      //});
    //});

    Listsservice.scanned().then(function (res) {
      $scope.state.mediadirs = res.data;
    });

    Listsservice.list_list().then(function (res) {
      $scope.state.lists = res.data;
    });

    $scope.activate = function (li) {
      $scope.state.active = li;
      $scope.state.active_type = $scope.state.listview;
      $scope.state.song_queue.splice(0, $scope.state.song_queue.length);
    };
  });
