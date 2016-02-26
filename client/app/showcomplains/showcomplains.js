'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.complaints.showcomplains', {
        url: '/showcomplains',
        templateUrl: 'app/showcomplains/showcomplains.html',
        controller: 'ShowcomplainsCtrl'
      });
  });
