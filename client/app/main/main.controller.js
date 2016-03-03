'use strict';

angular.module('prwithyomanApp')
  .controller('MainCtrl', function ($scope, $http, $window, Auth, $state, $location) {



      $scope.checkState = function(){
        $scope.isLoggedIn = Auth.isLoggedIn();
        if($scope.isLoggedIn){
          $location.path('/home/user');
        }
      }





    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  })
