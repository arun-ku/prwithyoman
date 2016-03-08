'use strict';

angular.module('prwithyomanApp')
  .controller('HomeCtrl', ['$scope','$location','Auth',function ($scope, $location,Auth) {
    $scope.message = 'Hello';
    $scope.logout = function(){
      Auth.logout();
      $location.path('/');
    }
    if(!Auth.isLoggedIn()){
      $location.path('/');
    }
    Auth.getCurrentUser().$promise.then(function(user){
      $scope.userImage = user.google.image.url;
      $scope.userName = user.name;
    });
  }]);
