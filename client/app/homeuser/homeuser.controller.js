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
    $scope.commentButtonDisabled = true;
    $scope.post.category = 'Activity';
    $scope.opinionButtonDisabled = false;
    Auth.getCurrentUser().$promise.then(function(user){
      $scope.userImageUrl = user.google.image.url;
      $scope.userName = user.name;
    });


    $scope.uploadFiles = function(files){
      $scope.files = files;
      $scope.buttonShow = false;
    };

    $scope.postComment = function(postId, scope){
      scope.commentButtonDisabled = true;
      var urlPattern = /(http:\/\/|https:\/\/)?(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var urlPattern2 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      scope.comment.content = scope.comment.content.replace(/\n/g, "<br/>");

      if(scope.comment.content.indexOf('https://') === -1 || scope.comment.content.indexOf('http://') === -1) {
        scope.comment.content = scope.comment.content.replace(urlPattern, '<a target="_blank' + '" href="'+'http://'+'$&">$&</a>');
      } else {
        scope.comment.content = scope.comment.content.replace(urlPattern, '<a target="_blank' + '" href="$&">$&</a>');
      }
      $http.post('/api/comments',{postId : postId, content : scope.comment.content}).then(function(res){
        scope.commentsForPost.unshift(res.data);
        scope.post.commentCount +=1;
        scope.comment.content = '';
      });
    };

    $scope.commentButtonEnabler = function(){
      if(this.comment.content == ''){
        this.commentButtonDisabled = true;
      }else{
        this.commentButtonDisabled = false;
      }
    };

    $scope.commentShowFunction =function(postId,scope){
      $http.get('/api/comments/'+postId).then(function(data){
        scope.commentsForPost = data.data;
      });
      scope.commentShow = true;

    }

    $scope.resetForm = function(){
      $scope.post.category = 'Activity';
      $scope.post.content = "";
      $scope.showContent = "";
      $scope.files = '';
      $scope.buttonShow = true;
      $scope.frm.$setPristine();
    }

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
      $scope.opinionButtonDisabled = true;
      PostService.update({postId : postId, opinion : type},function(data){

        $scope.opinionButtonDisabled = false;
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
      $scope.buttonShow2 = true;
      $scope.post.imageUrl ='';

      if($scope.files && $scope.files!=''){
        angular.forEach($scope.files, function(file){
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
              $scope.post.imageUrl = data.secure_url;
              $scope.post.buzzDate = Date.now();

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
                  $scope.buttonShow2 = false;
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
                  $scope.buttonShow2 = false;
                  $scope.files = '';
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
            }).error(function (data, status, headers, config) {
              file.result = data;
            });
          }
        });
      }else{
        $scope.post.buzzDate = Date.now();

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
            $scope.buttonShow2 = false;
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
            $scope.buttonShow2 = false;
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
