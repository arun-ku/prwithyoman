/**
 * Created by arun on 22/2/16.
 */
angular.module('prwithyomanApp')
  .config(function ($stateProvider){
    $stateProvider
      .state('home',{
        url : '/home',
        templateUrl : 'app/home/home.html',
        controller: 'HomeCtrl'
      })
  })
