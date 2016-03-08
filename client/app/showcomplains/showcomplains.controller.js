'use strict';

angular.module('prwithyomanApp')
  .controller('ShowcomplainsCtrl',['$scope','ShowComplainsService','Auth' , function ($scope, complain, Auth) {
    var complains = this;
    complains.skip = 0;
    Auth.getCurrentUser().$promise.then(function(user){
      complains.currentUser = user;
      complains.nextButtonShow = true;
      complains.previousButtonShow = false;
      complain.getCount({userId : complains.currentUser._id, offset : 0},function(data){
        complains.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/5)+1;
        complains.pagesArray = Array(complains.numberOfPages);
        complains.filedComplains = data.data;
        complains.nextSkip = 1;
        complains.previousSkip = -1;
      });
    });

    complains.getPosts = function(skip){
      complain.getComplains({userId : complains.currentUser._id,offset : skip*5},function(data){
        complains.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/5)+1;
        complains.pagesArray = Array(complains.numberOfPages);
        complains.filedComplains = data.data;
        complains.skip = skip;
        complains.nextSkip = skip+1;
        complains.previousSkip = skip-1;
        if((complains.nextSkip*5) >= complains.initialCount){
          complains.nextButtonShow = false;
        }else{
          complains.nextButtonShow = true;
        }
        if(complains.previousSkip <0){
          complains.previousButtonShow = false;
        }else{
          complains.previousButtonShow = true;
        }
      });
    }
  }]);
