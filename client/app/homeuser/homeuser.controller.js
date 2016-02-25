'use strict';

angular.module('prwithyomanApp')
  .controller('HomeuserCtrl', function ($scope, Auth, $http) {
    $scope.post = {};
    $scope.setCategory = function(category){
      $scope.post.category = category;
    }
    $scope.getPosts = function(){
      $http.get("http://localhost:9000/api/posts").then(function(response){
        $scope.posts = response.data;

      });
    }
    $scope.showDate = function(timestamp){
      var date = new Date(timestamp);
      return date;
    }

    $scope.submitPost = function(){
      $scope.post.buzzDate = Date.now();
      $scope.post.imageUrl = '';
      $scope.post.user = '';
      $scope.post.content = $scope.post.content.replace(/\n/g, "<br/>");
      console.log($scope.post);
      var fd = new FormData();
      for(var key in $scope.post){
        fd.append(key,$scope.post[key]);
      }
      $http.post("http://localhost:9000/api/posts", fd,{
          transformRequest : angular.identity,
          headers: { 'Content-Type' : undefined}
        }).then(function(response){
        if(response.result == 0){
          console.log(response.err);
        } else {
          console.log(response);
        }
        $scope.post.content = '';
        $scope.getPosts();
        /*window.location='#/';*/
      }, function (err) {
          console.log('errrrr',err);
        });
    }
  });
