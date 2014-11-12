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
      if ($scope.state.new_list.name) {
        var tmp_list = $scope.state.new_list;
        $scope.state.new_list = {};
        tmp_list.files = [];
        $scope.state.lists.push(tmp_list);
        Listsservice.list_create(tmp_list).success(function (res) {
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
          Listsservice.list_delete(li._id).success(function(/*res*/) {
            arr_del($scope.state.lists, li);
          });
        } else {
          arr_del($scope.state.lists, li);
        }
      }
    };

    $scope.list_push = function(li, f) {
      if ($scope.flags.edit && li && li._id && !has_file(li,f)) {
        li.files.push(f);
        Listsservice.list_put(li._id, li);
      }
    };

    $scope.list_pop = function(li, f/*, $event*/) {
      if (li && f) {
        arr_del(li.files, f);
        if (li._id) {
          Listsservice.list_put(li._id, li);
        }
      }
    };

    function has_file(list, file) {
      if (list && list._id && file && file.path) {
        for (var i=0; i<list.files.length; i++) {
          if (file.path === list.files[i].path) {
            return true;
          }
        }
      }
      return false;
    }

    function arr_del(arr, obj) {
      var idx = arr.indexOf(obj);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    }
  });
