'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/login?code',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

  });
