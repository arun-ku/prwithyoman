'use strict';

angular.module('prwithyomanApp')
  .controller('ShowcomplainsCtrl',['$scope','ShowComplainsService','Auth', 'ShowAllComplainsService', function ($scope, complain, Auth, allComplain) {
    var complains = this;
    complains.skip = 0;
    Auth.getCurrentUser().$promise.then(function(user){
      complains.currentUser = user;
      complains.nextButtonShow = true;
      complains.previousButtonShow = false;
      complain.getComplains({userId : complains.currentUser._id, offset : 0,limit : 5},function(data){
        complains.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/5)+1;
        complains.pagesArray = Array(complains.numberOfPages);
        complains.filedComplains = data.data;
        complains.nextSkip = 1;
        complains.previousSkip = -1;
      });
    });

    complains.close =function(complainId, userId, i){
      var offset, description, message;
      if(complains.currentUser._id == userId){
        offset = '3';
        description = 'Closed';
        message = 'Closed by';
      }else{
        offset = '2';
        description = 'Completed';
        message = 'Completed by';
      }
      allComplain.updateComplain({limit : complainId, offset :  offset, description : description, message : message}, function(data){
        complains.filedComplains[i].status = data.status;
        complains.filedComplains[i].assignee = data.assignee;
      });
    }

    complains.getPosts = function(skip){
      complain.getComplains({userId : complains.currentUser._id,offset : skip*5,limit : 5},function(data){
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
  }])
  .controller('ShowallcomplainsCtrl',['$scope','ShowAllComplainsService','Auth' , function ($scope, complain, Auth) {
    var complains = this;
    complains.skip = 0;
    Auth.getCurrentUser().$promise.then(function(user){
      complains.currentUser = user;
      complains.nextButtonShow = true;
      complains.previousButtonShow = false;
      complain.getAllComplains({offset : 0,limit : 10},function(data){
        complains.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/10)+1;
        complains.pagesArray = Array(complains.numberOfPages);
        complains.filedComplains = data.data;
        complains.nextSkip = 1;
        complains.previousSkip = -1;
      });
    });


    complains.assign = function(complainId, i){
      complain.updateComplain({limit : complainId, offset :  '1', description : 'Assigned', message : 'Assigned to'}, function(data){
        console.log(data.status,'>>>',data.assignee)
        complains.filedComplains[i].status = data.status;
        complains.filedComplains[i].assignee = data.assignee;
      });
    }

    complains.close =function(complainId, userId, i){
      var offset, description, message;
      if(complains.currentUser._id == userId){
         offset = '3';
        description = 'Closed';
        message = 'Closed by';
      }else{
         offset = '2';
        description = 'Completed';
        message = 'Completed by';
      }
      complain.updateComplain({limit : complainId, offset :  offset, description : description, message : message}, function(data){
        complains.filedComplains[i].status = data.status;
        complains.filedComplains[i].assignee = data.assignee;
      });
    }

    complains.getPosts = function(skip){
      complain.getAllComplains({offset : skip*10,limit : 10},function(data){
        complains.initialCount = data.count;
        complains.numberOfPages = Math.floor((data.count-1)/10)+1;
        complains.pagesArray = Array(complains.numberOfPages);
        complains.filedComplains = data.data;
        complains.skip = skip;
        complains.nextSkip = skip+1;
        complains.previousSkip = skip-1;
        if((complains.nextSkip*10) >= complains.initialCount){
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

