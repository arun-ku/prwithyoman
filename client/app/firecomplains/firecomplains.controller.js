'use strict';

angular.module('prwithyomanApp')
  .controller('FirecomplainsCtrl', ['$scope','Auth', 'Upload', 'cloudinary','ComplainService', function ($scope, Auth, $upload, cloudinary, Complain) {
    $scope.complain={};
    $scope.complain.category = 'Hardware';
    $scope.buttonShow = true;
    $scope.buttonShow2 = false;
    $scope.complain.title = "";
    $scope.complain.content = "";
    $scope.complain.imageUrl ='';

    Auth.getCurrentUser().$promise.then(function (user) {
      $scope.userImageUrl = user.google.image.url;
      $scope.userName = user.name;
    });


    $scope.setCategory = function (category) {
      $scope.complain.category = category;
    }
    $scope.uploadFiles = function(files){
      $scope.files = files;
    };

    $scope.shouldShow = function(){
      $scope.showContent = $scope.complain.content;
      if($scope.complain.content == ""){
        $scope.frm.$setPristine();
      }
    }

    $scope.submitComplain = function(){
      $scope.buttonShow2 = true;

      $scope.complainObj = {
        title : $scope.complain.title,
        content : $scope.complain.content,
        category : $scope.complain.category,
        fireDate : Date.now(),
        imageUrl : $scope.complain.imageUrl
      }

      if($scope.files && $scope.files!='') {
        angular.forEach($scope.files, function (file) {
          if (file && !file.$error) {
            file.upload = $upload.upload({
              url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'myphotoalbum',
                context: 'photo=' + new Date(),
                file: file,
                bypassAuth: 'pass'
              }
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data) {
              $scope.complainObj.imageUrl = data.secure_url;
              Complain.addComplain($scope.complainObj,function(){
                $scope.frm.$setPristine();
                $scope.complain.title = "";
                $scope.complain.content = "";
                $scope.complain.imageUrl ='';
                $scope.files = '';
                $scope.complain.category = 'Hardware';
                $scope.buttonShow2 = false;
                toastr["success"]("Thank you for your feedback.", "Complain Submitted",{
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
              });
            }).error(function (data, status, headers, config) {
              file.result = data;
            });
          }
        });

      }else{
        Complain.addComplain($scope.complainObj,function(){
          $scope.frm.$setPristine();
          $scope.complain.title = "";
          $scope.complain.content = "";
          $scope.complain.imageUrl ='';
          $scope.files = '';
          $scope.complain.category = 'Hardware';
          $scope.buttonShow2 = false;
          toastr["success"]("Thank you for your feedback.", "Complain Submitted",{
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
        });
      }


    }
  }]);
