'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.complaints.showcomplains', {
        url: '/showcomplains',
        templateUrl: 'app/showcomplains/showcomplains.html',
        controller: 'ShowcomplainsCtrl as complains'
      })
      .state('home.showAllComplains', {
        url: '/showallcomplains',
        templateUrl: 'app/showcomplains/showAllComplains.html',
        controller: 'ShowallcomplainsCtrl as complains'
      });
  });
