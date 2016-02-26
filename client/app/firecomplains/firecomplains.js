'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.complaints.firecomplains', {
        url: '/firecomplains',
        templateUrl: 'app/firecomplains/firecomplains.html',
        controller: 'FirecomplainsCtrl'
      });
  });
