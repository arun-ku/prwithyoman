'use strict';

angular.module('prwithyomanApp')
  .controller('HomeuserCtrl', function ($scope, Auth, $http, Reddit) {
    $scope.posts = new Reddit();
    $scope.post = {};
    $scope.post.content = "";
    $scope.postShow = false;
    $scope.userImageUrl = Auth.getCurrentUser().google.image.url;
    $scope.userName = Auth.getCurrentUser().name;
    $scope.shouldShow = function(){
      if($scope.post.content != "" || $scope.post.file){
        $scope.postShow = true;
      }else{
        $scope.postShow = false;
      }

    }


    $scope.billuCaller = function(){
      return new Reddit().billu();
    }
    $scope.post.category = 'Buzz';
    $scope.setCategory = function(category){
      $scope.post.category = category;
    }
   /* $scope.getPosts = function(){
      $http.get("http://localhost:9000/api/posts").then(function(response){
        $scope.posts = response.data;

      });
    }*/
  /*  $scope.showDate = function(timestamp){
      var date = new Date(timestamp);
      return date;
    }*/

    $scope.submitPost = function(){
      $scope.postShow = false;
      if($scope.post.category == 'Type'){
        $scope.post.category = 'Buzz';
      }
      $scope.post.buzzDate = Date.now();
      $scope.post.imageUrl = '';
      $scope.post.user = '';
      $scope.post.content = $scope.post.content.replace(/\n/g, "<br/>");
      var fd = new FormData();
      for(var key in $scope.post){
        fd.append(key,$scope.post[key]);
      }
      $http.post("http://localhost:9000/api/posts", fd,{
          transformRequest : angular.identity,
          headers: { 'Content-Type' : undefined}
        }).then(function(response){
        if(response.data.result == 0){
          toastr["error"]("The file you sent is of invalid type. Please send an image only", "Invalid File",{
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": "2000",
            "hideDuration": "1000",
            "timeOut": "8000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });


        } else {

          $scope.posts.items.unshift(response.data);
          $scope.posts.updateOffsetByOne();
          toastr["success"]("Your post has been submitted successfully", "Post Submitted",{
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": "2000",
            "hideDuration": "1000",
            "timeOut": "4000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });

        }
        $scope.post.content = '';
        /*$scope.getPosts();*/
        /*window.location='#/';*/
      }, function (err) {
          console.log('errrrr',err);
        });
    }
  })
  .controller('LostAndFoundCtrl', function ($scope, Auth, $http, Reddit) {
    $scope.posts = new Reddit();
    $scope.post = {};
    $scope.post.content = "";
    $scope.postShow = false;
    $scope.userImageUrl = Auth.getCurrentUser().google.image.url;
    $scope.userName = Auth.getCurrentUser().name;
    $scope.shouldShow = function(){
      if($scope.post.content != "" || $scope.post.file){
        $scope.postShow = true;
      }else{
        $scope.postShow = false;
      }
    }
  });
