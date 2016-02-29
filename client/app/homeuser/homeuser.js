'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider){
    $stateProvider
      .state('home.user',{
        url : '/user',
        templateUrl : 'app/homeuser/homeuser.html',
        controller: 'HomeuserCtrl'
      })
      .state('home.lostandfound',{
        url : '/LostAndFound',
        templateUrl : 'app/homeuser/lostandfound.html',
        controller: 'LostAndFoundCtrl'
      })
  })
