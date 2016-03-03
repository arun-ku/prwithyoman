'use strict';

angular.module('prwithyomanApp')
  .controller('HomeuserCtrl', function ($scope, Auth, $http, Reddit, PostService) {
    $scope.posts = new Reddit();
    $scope.post = {};
    $scope.canvasShow = false;
    $scope.post.content = "";
    $scope.postShow = false;
    $scope.userImageUrl = Auth.getCurrentUser().google.image.url;
    $scope.userName = Auth.getCurrentUser().name;


    $scope.shouldShow = function(){
      $scope.showContent = $scope.post.content;
      var urlPattern = /(http:\/\/|https:\/\/)?(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var urlPattern2 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      $scope.showContent = $scope.showContent.replace(/\n/g, "<br/>");

    if($scope.showContent.indexOf('https://') === -1 || $scope.showContent.indexOf('http://') === -1) {
      $scope.showContent = $scope.showContent.replace(urlPattern, '<a target="_blank' + '" href="'+'http://'+'$&">$&</a>');
    } else {
      $scope.showContent = $scope.showContent.replace(urlPattern, '<a target="_blank' + '" href="$&">$&</a>');
    }

      //if($scope.showContent.indexOf('http://')!= -1) {
      //  $scope.showContent = $scope.showContent.replace(urlPattern, '<a target="_blank' + '" href="$&">$&</a>');
      //}else if($scope.showContent.indexOf('https://') == -1) {
      //  $scope.showContent = $scope.showContent.replace(urlPattern, '<a target="_blank' + '" href="'+'http://'+'$&">$&</a>');
      //}
      if($scope.post.content != ""){
        $scope.postShow = true;
      }else{
        $scope.postShow = false;
        if(!$scope.canvasShow)
          $scope.frm.$setPristine();
      }

    }

    $scope.updateOpinion = function(type, postId){
      PostService.update({postId : postId, opinion : type},function(data){
        console.log(data);
      });
    };


    $scope.billuCaller = function(){
      return new Reddit().billu();
    }
    $scope.post.category = 'Activity';
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
      $scope.frm.$setPristine();
      $scope.postShow = false;
      if($scope.post.category == 'Type'){
        $scope.post.category = 'Activity';
      }
      $scope.post.buzzDate = Date.now();
      $scope.post.imageUrl = '';
      $scope.post.user = '';
      var urlPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      $scope.post.content = $scope.post.content.replace(/\n/g, "<br/>");
      if($scope.post.content.indexOf('https://') === -1 || $scope.post.content.indexOf('http://') === -1) {
        $scope.post.content = $scope.post.content.replace(urlPattern, '<a target="_blank' + '" href="'+'http://'+'$&">$&</a>');
      } else {
        $scope.post.content = $scope.post.content.replace(urlPattern, '<a target="_blank' + '" href="$&">$&</a>');
      }
      var fd = new FormData();
      for(var key in $scope.post){
        fd.append(key,$scope.post[key]);
      }
      $http.post("/api/posts", fd,{
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
        $scope.post.category = 'Activity';
        $scope.postShow = false;
        $scope.canvasShow = false;
        $scope.post.file = {};
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
