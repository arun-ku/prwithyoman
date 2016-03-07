'use strict';

angular.module('prwithyomanApp')
  .controller('FirecomplainsCtrl', ['$scope','Auth', function ($scope, Auth) {
    $scope.comment={};
    $scope.comment.category = 'Hardware';
    $scope.buttonShow = true;
    $scope.buttonShow2 = false;
    $scope.comment.title = "";
    $scope.comment.content = "";
    Auth.getCurrentUser().$promise.then(function (user) {
      $scope.userImageUrl = user.google.image.url;
      $scope.userName = user.name;
    });


    $scope.setCategory = function (category) {
      $scope.comment.category = category;
    }
    /*$scope.uploadFiles = function(files){
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
    };*/

    $scope.shouldShow = function(){
      $scope.showContent = $scope.comment.content;
      if($scope.comment.content == ""){
        $scope.frm.$setPristine();
      }
    }
  }]);
