'use strict';

angular.module('prwithyomanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'angularMoment',
  'hm.readmore',
  'infinite-scroll',
  'ngFileUpload',
  'cloudinary',
  'ngCookies'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, cloudinaryProvider) {
    cloudinaryProvider
      .set("cloud_name", "buzzcloud")
      .set("upload_preset", "xb8f9g0w");
    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        var hasOverride = config.data && config.data.bypassAuth === "pass";
        if ($cookieStore.get('token') && !hasOverride) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth,amMoment) {
    amMoment.changeLocale('de');
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });
