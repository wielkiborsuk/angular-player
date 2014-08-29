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

    $scope.rescan = function () {
      Listsservice.smscan().then(function (/*res*/) {
        Listsservice.scanned().then(function (res) {
          $scope.state.mediadirs = res.data;
        });
      });
    };

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
        console.log('Cant insert a list with no name.');
      }
    };

    $scope.list_delete = function(li, $event) {
      $event.stopPropagation();
      if (li) {
        if (li._id) {
          listsService.list_delete(li._id).success(function(/*res*/) {
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

    $scope.list_pop = function(li, f/*, $event*/) {
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
  });
