'use strict';

app.controller('AuthCtrl', function ($scope, $http, $state, $mdSidenav, localStorageService) {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //$state.go('index');
    } else {
      $state.go('index');
    }
  });

  $scope.signIn = function () {
    $scope.close();
    yam.platform.login({ network: 'vetlanda-network-test' }, function (response) {
      if (response.authResponse) {
        $scope.user = true;
        localStorageService.set('yammer_access_token', response.access_token.token);
        signInAnonymously();
      }
    });
  };

  var signInAnonymously = function () {
    firebase.auth().signInAnonymously().then(function() {
      $state.go('index');
    }).catch(function(error) {
      console.log(error);
    });
  };

  $scope.signOut = function () {
    firebase.auth().signOut().then(function () {
      $scope.close();
      yam.platform.logout(function () {
        $scope.user = false;
        localStorageService.remove('yammer_access_token');
        $state.go('sign-in');
      });
    }, function (error) {
    });
  };

  $scope.close = function () {
    $mdSidenav('left').close();
  };

  $scope.toggleMenu = buildToggler('left');

  function buildToggler(navId) {
    return function () {
      $mdSidenav(navId).toggle();
    };
  }

  if (localStorageService.get('yammer_access_token')) {
    yam.platform.setAuthToken(localStorageService.get('yammer_access_token'));
  }

  yam.getLoginStatus(
    function(response) {
      if (response.status === 'connected') {
        $scope.user = true;
      }
    });
});
