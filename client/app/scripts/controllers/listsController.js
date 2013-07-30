'use strict';

angular.module('clientApp')
  .controller('ListscontrollerCtrl', function ($scope, listsService) {
    // $scope.lists = [{name:'a',files:['f','f2','f3']}, {name:'b'}, {name:'c'}]
    $scope.active = {}
    $scope.curr = ''
    $scope.mediabase = listsService.base
    
    listsService.smscan().then(function (res) {
        listsService.lists().then(function (res) {
            $scope.lists = res.data;
        })
    })
    
    $scope.activate = function (li) {
        $scope.active = li;
        $scope.select(li.files[0]);
    }

    $scope.select = function (f) {
        $scope.curr = f;
        $scope.player.src = $scope.mediabase+$scope.active.path+'/'+f;
        $scope.player.load();
    }

    $scope.manifest = function () {
        alert('this is the manifest')
    }

    $scope.next = function () {
        if ($scope.active.files) {
            var i = $scope.active.files.indexOf($scope.curr);
            if (i > -1) {
                if (i+1<$scope.active.files.length) {
                    $scope.select($scope.active.files[i+1])
                }
            }
        }
    }
    // angular.bind($scope, fn, args);
  });
