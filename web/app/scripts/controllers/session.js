'use strict';

app.controller('SessionCtrl', function ($scope, $stateParams, $http, $timeout, $sce, $firebaseArray, $firebaseObject, $state, sessionsService, localStorageService) {

  $scope.loading = true;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $firebaseArray(sessionsService.getSessionsRef()).$loaded().then(function(sessions) {
    $scope.loading = false;
    $scope.sessions = sessions;
    var sessionRef = $scope.sessions.$ref().child($stateParams.sessionId);
    $firebaseObject(sessionRef).$loaded().then(function (session) {
      $scope.session = session;
      loadConversationData();
    });
  });

  var loadConversationData = function () {
    $http.get('https://api.yammer.com/api/v1/messages/in_group/' + $scope.session.yammerGroupId + '.json',
      {headers: {'Authorization': 'Bearer ' + localStorageService.get("yammer_access_token")}}).
      success(function (response) {
        $scope.session.groupConversationCount = response.messages.length;
        var participants = _.where(response.references, {type: 'user'});
        $scope.session.participantsCount = participants.length;
      });
  };

  $scope.$watch('session', function () {
    yam.connect.embedFeed({
      "feedType": "group",
      "feedId": $scope.session.yammerGroupId,
      "config": {
        "use_sso": false,
        "header": false,
        "footer": false,
        "showOpenGraphPreview": false,
        "defaultToCanonical": false,
        promptText: "Comment on this",
        "hideNetworkName": true
      },
      "container": "#embedded-feed"
    });

    var video = document.getElementById('my-video');
    video.src = $scope.trustSrc($scope.session.videoUrl);
    video.load();
  });
});

