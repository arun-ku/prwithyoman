'use strict';

angular.module('prwithyomanApp')
  .controller('ShowcomplainsCtrl',['$scope','ShowComplainsService','Auth' , function ($scope, complain, Auth) {
    var complains = this;
    complains.skip = 0;
    Auth.getCurrentUser().$promise.then(function(user){
      complains.currentUser = user;
      complain.getCount({userId : complains.currentUser._id, option : 'getCount'},function(data){
        complain.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/5)+1;
        complains.pagesArray = Array(complains.numberOfPages+1).join('a').split('');
        console.log(data.count);
      });
    });

    complains.getPosts = function(skip){
      complain.getComplains({userId : complains.currentUser._id,offset : skip},function(data){
        complains.filedComplains = data.data;
        complains.skip = skip/5;
      });
    }
  }]);
