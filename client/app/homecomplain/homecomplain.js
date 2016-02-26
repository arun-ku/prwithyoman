'use strict';

angular.module('prwithyomanApp')
  .config(function ($stateProvider){
    $stateProvider
      .state('home.complaints',{
        url : '/complains',
        templateUrl : 'app/homecomplain/homecomplain.html',
        controller: 'HomecomplainCtrl',
        abstract : true
      })
  })
