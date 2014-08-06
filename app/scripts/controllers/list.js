'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('ListCtrl', function ($scope, Listsservice) {
    $scope.mediabase = Listsservice.base;

    //Listsservice.smscan().then(function (res) {
      //Listsservice.scanned().then(function (res) {
        //$scope.mediadirs = res.data;
      //});
    //});

    Listsservice.scanned().then(function (res) {
      $scope.mediadirs = res.data;
    });

    Listsservice.list_list().then(function (res) {
      $scope.lists = res.data;
    });
  });
