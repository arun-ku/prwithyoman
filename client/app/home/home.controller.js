'use strict';

angular.module('prwithyomanApp')
  .controller('HomeCtrl', ['$scope','$location','Auth',function ($scope, $location,Auth) {
    $scope.message = 'Hello';
    $scope.logout = function(){
      Auth.logout();
      $location.path('/');
    }
    $scope.user_name = Auth.getCurrentUser().name;
    $scope.user_img = Auth.getCurrentUser().google.image.url;
    $scope.id = Auth.getCurrentUser()._id;
  }]);
