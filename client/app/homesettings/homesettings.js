'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider){
    $stateProvider
      .state('home.settings',{
        url : '/settings',
        templateUrl : 'app/homesettings/homesettings.html',
        controller: 'HomesettingsCtrl'
      })
  })
