'use strict';

angular.module('prwithyomanApp')
  .controller('MainCtrl', function ($scope, $http, $window, Auth, $state, $location) {

    if($state.params.code){
      toastr["warning"]("Please enter emails like 'example@tothenew.com' only.", "Invalid Email",{
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "showDuration": "2000",
        "hideDuration": "1000",
        "timeOut": "8000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      });

    }

var currentUser = Auth.getCurrentUser();

    currentUser.$promise && currentUser.$promise.then(function (user) {
      $location.path('/home/user');
    });





    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  })
