'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider){
    $stateProvider
      .state('home.user',{
        url : '/user',
        templateUrl : 'app/homeuser/homeuser.html',
        controller: 'HomeCtrl'
      })
  })
