'use strict';

angular.module('prwithyomanApp')
  .controller('HomeuserCtrl', function ($scope, Auth, $http) {
    $scope.setCategory = function(category){
      $scope.category = category;
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
      $http.post("http://localhost:9000/api/posts", {
        category : $scope.category,
        imageUrl : '',
        content : $scope.content.replace(/\n/g, "<br/>"),
        buzzDate : Date.now(),
        user : {
          id: Auth.getCurrentUser()._id,
          name : Auth.getCurrentUser().name,
          imageUrl : Auth.getCurrentUser().google.image.url
        }
      }).then(function(data, status){
        $scope.content = '';
        $scope.getPosts();
        /*window.location='#/';*/
      });
    }
  });
