'use strict';

angular.module('prwithyomanApp')
  .controller('MainCtrl', function ($scope, $http, $window, Auth, $state, $location) {


var currentUser = Auth.getCurrentUser();

    currentUser.$promise && currentUser.$promise.then(function (user) {
      $location.path('/home/user');
    });





    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  })
