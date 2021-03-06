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

    if (!Object.keys($scope.state.mediadirs).length) {
      Listsservice.scanned().then(function (res) {
        $scope.state.mediadirs = res.data;
        $scope.activate_by_name($scope.state.path.list);
        $scope.select_by_name($scope.state.path.song);
      });
    }

    if (!Object.keys($scope.state.lists).length) {
      Listsservice.list_list().then(function (res) {
        $scope.state.lists = res.data;
        $scope.activate_by_name($scope.state.path.list);
        $scope.select_by_name($scope.state.path.song);
      });
    }

    $scope.rescan = function () {
      Listsservice.smscan().then(function (/*res*/) {
        Listsservice.scanned().then(function (res) {
          $scope.state.mediadirs = res.data;
          $scope.activate_by_name($scope.state.path.list);
          $scope.select_by_name($scope.state.path.song);
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
      if ($event) {
        $event.stopPropagation();
      }
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

    $scope.list_push = function(li, f, $event) {
      if ($event) {
        $event.stopPropagation();
      }
      if ($scope.flags.edit && li && li._id && !has_file(li,f)) {
        li.files.push(f);
        Listsservice.list_put(li._id, li);
      }
    };

    $scope.list_pop = function(li, f, $event) {
      if ($event) {
        $event.stopPropagation();
      }
      if (li && f) {
        arr_del(li.files, f);
        if (li._id) {
          Listsservice.list_put(li._id, li);
        }
      }
    };

    $scope.pin_list = function (li, $event) {
      if ($event) {
        $event.stopPropagation();
      }
      if (li && li._id) {
        $scope.state.pinned = li;
      }
    };

    $scope.unpin_list = function () {
      $scope.state.pinned = null;
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

    $scope.has_file = has_file;

    function arr_del(arr, obj) {
      var idx = arr.indexOf(obj);
      if (idx > -1) {
        arr.splice(idx, 1);
      }
    }
  });
