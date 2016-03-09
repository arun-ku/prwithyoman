'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.complain', {
        url: '/complain/:complainId',
        templateUrl: 'app/complain/complain.html',
        controller: 'ComplainCtrl as complainDetails'
      });
  });
