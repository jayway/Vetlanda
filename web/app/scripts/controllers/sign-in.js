'use strict';

app.controller('SignInCtrl', function ($scope, $http) {





  $scope.getMySessions = function () {
    yam.platform.request({
      url: "groups.json",     //this is one of many REST endpoints that are available
      method: "GET",
      data: {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
        mine: 1
      },
      success: function (groups) { //print message response information to the console
        console.dir(groups);
      },
      error: function (groups) {
      }
    });
  };

  $scope.getSessions = function () {
    yam.platform.request({
      url: "groups.json",     //this is one of many REST endpoints that are available
      method: "GET",
      data: {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
      },
      success: function (groups) { //print message response information to the console
        console.dir(groups);
      },
      error: function (groups) {
      }
    });
  };

  $scope.getFiles = function () {
    yam.platform.request({
      url: "uploaded_files.json",     //this is one of many REST endpoints that are available
      method: "GET",
      data: {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
      },
      success: function (files) { //print message response information to the console
        console.dir(files);
      },
      error: function (groups) {
      }
    });
  };

  $scope.getSessionJson = function () {
    yam.platform.request({
      url: "uploaded_files.json",     //this is one of many REST endpoints that are available
      method: "GET",
      data: {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
        id: 65698517
      },
      success: function (files) { //print message response information to the console
        console.dir(files);
      },
      error: function (groups) {
      }
    });
  };

  $scope.downloadSessionJson = function () {
    yam.platform.request({
      url: "uploaded_files.json/65698517/download",     //this is one of many REST endpoints that are available
      method: "GET",
      data: {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
      },
      success: function (files) { //print message response information to the console
        console.dir(files);
      },
      error: function (groups) {
      }
    });
  };

  $scope.downloadFile = function () {
    $http({method: 'GET', url: 'https://www.yammer.com/api/v1/uploaded_files/65698517/download',
      header: {
        'Authorization': 'Bearer ' + $scope.access_token.token
      },
      success: function (files) { //print message response information to the console
        console.dir(files);
      },
      error: function (error) {
      }});
  };

  // GET THIS TO WORK IN MVP
  $scope.callNetwork = function () {
    $http({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + $scope.access_token.token
      },
      url: 'https://api.yammer.com/vetlanda-network-test/api/v1/groups.json',
      data: {
        mine: '1'
      }
    }).then(function successCallback(groups) {
      console.dir(groups);
    }, function errorCallback(response) {
      console.dir(response);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };
});
