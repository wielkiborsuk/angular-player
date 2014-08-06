'use strict';

/**
 * @ngdoc function
 * @name angularPlayerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularPlayerApp
 */
angular.module('angularPlayerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
