'use strict';

angular.module('clientApp')
  .controller('ListscontrollerCtrl', function ($scope, listsService) {
    $scope.lists = [{name:'a',files:['f','f2','f3']}, {name:'b'}, {name:'c'}]
    $scope.active = {}
    
    listsService.smscan().then(function (res) {
        listsService.lists().then(function (res) {
            $scope.lists = res.data;
        })
    })
    
    $scope.activate = function (li) {
        $scope.active = li;
    }
  });
