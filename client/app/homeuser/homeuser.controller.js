'use strict';

angular.module('prwithyomanApp')
  .controller('HomeuserCtrl',['$scope', 'Auth', '$http', 'Reddit', 'PostService', 'Upload', 'cloudinary', function ($scope, Auth, $http, Reddit, PostService, $upload, cloudinary) {
    $scope.posts = new Reddit();
    $scope.post = {};
    $scope.canvasShow = false;
    $scope.post.content = "";
    $scope.postShow = false;
    $scope.buttonShow = true;
    $scope.buttonShow2 = false;
    $scope.commentShow = false;
    Auth.getCurrentUser().$promise.then(function(user){
      $scope.userImageUrl = user.google.image.url;
      $scope.userName = user.name;
    });


    $scope.uploadFiles = function(files){
      $scope.files1 = files;
      $scope.buttonShow2 = true;
      if (!$scope.files1) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + new Date(),
              file: file,
              bypassAuth : 'pass'
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data) {
            file.result = data;
            $scope.buttonShow = false;
            $scope.buttonShow2 = false;
          }).error(function (data, status, headers, config) {
            file.result = data;
            $scope.buttonShow2 = false;
          });
        }
      });
    };

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

    $scope.updateOpinion = function(type, postId, i){
      PostService.update({postId : postId, opinion : type},function(data){
        if(data.resCode != 0){
          $scope.posts.items[i].count[type+'s']+=1;
          if(data.type!=''){
            $scope.posts.items[i].count[data.type+'s']-=1;
          }
        }

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
      $scope.buttonShow = true;
      $scope.postShow = false;
      if($scope.post.category == 'Type'){
        $scope.post.category = 'Activity';
      }
      $scope.post.buzzDate = Date.now();
      if($scope.files1){
        $scope.post.imageUrl = $scope.files1[0].result.secure_url;
      }else{
        $scope.post.imageUrl ='';
      }

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
  }])
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
