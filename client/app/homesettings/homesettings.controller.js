'use strict';

angular.module('prwithyomanApp')
  .controller('HomesettingsCtrl', ['Auth', 'UserUpdateService','Upload', 'cloudinary', function (Auth, user, $upload, cloudinary) {
    var settings = this;
    settings.files = '';
    settings.userName ='';
    settings.loadingShow = false;
    settings.userPosition='';
    settings.hasAnythingChanged = false;
     Auth.getCurrentUser().$promise.then(function(user){
       settings.currentUser = user;
       settings.userName = user.name;
       settings.userPosition = user.position;
     });
    settings.uploadFiles = function(files){
      settings.files = files;
      if(settings.userName && settings.userPosition)
      settings.hasAnythingChanged = true;
    };
    settings.textChanged = function(){
      console.log(settings.userName, settings.userPosition);
      if(!settings.userName|| !settings.userPosition){
        settings.hasAnythingChanged = false;
      }else{
        settings.hasAnythingChanged = true;
      }
    }

    settings.saveDetails = function(){

      settings.loadingShow = true;
      settings.currentUser.name = settings.userName;
      settings.currentUser.position = settings.userPosition;


      if(settings.files && settings.files!='') {
        angular.forEach(settings.files, function (file) {
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
              settings.currentUser.google.image.url = 'https://res.cloudinary.com/buzzcloud/image/upload/w_50,h_50/'+data.public_id+'.'+data.format;
              user.update({id : settings.currentUser._id},settings.currentUser,function(data){
                settings.loadingShow = false;
                settings.hasAnythingChanged = false;
                settings.files = '';
                toastr["success"]("Your information is updated. Kindly refresh to see the changes.", "Data Updated",{
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
        user.update({id : settings.currentUser._id},settings.currentUser,function(data){
          settings.loadingShow = false;
          settings.hasAnythingChanged = false;
          settings.files = '';
          toastr["success"]("Your information is updated. Kindly refresh to see the changes.", "Data Updated",{
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

    };
  }]);
