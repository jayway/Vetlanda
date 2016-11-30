'use strict';

var app = angular.module('vetlandaWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'firebase',
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'angularGrid',
  'LocalStorageModule',
  'angularTrix'
])
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('vetlandaWebApp');
    localStorageServiceProvider.setStorageType('sessionStorage');

    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/sessions');
    $stateProvider
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'views/sign-in.html',
        controller: 'SignInCtrl',
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function (Auth) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return Auth.$waitForSignIn();
          }]
        }
      })
      .state('index', {
        url: '/',
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function (Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .state('/sessions', {
        url: '/sessions',
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function (Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .state('/session', {
        url: '/sessions/:sessionId',
        templateUrl: 'views/session.html',
        controller: 'SessionCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function (Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .state('/admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .state('/admin.settings', {
        views: {
          'adminSessions': {
            templateUrl: '/views/admin-sessions.html',
            controller: 'AdminSessionsCtrl',
            resolve: {
              // controller will not be loaded until $requireSignIn resolves
              // Auth refers to our $firebaseAuth wrapper in the example above
              'currentAuth': ['Auth', function (Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireSignIn();
              }]
            }
          }
        }
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('grey');
  });

app.factory('Auth', ['$firebaseAuth',
  function ($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      $state.go('sign-in');
    }
  });
}]);

