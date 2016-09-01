'use strict';

app.controller('SessionCtrl', function ($scope, $stateParams, $timeout, $sce, $firebaseArray, $firebaseObject, $state, sessionsService) {

  $scope.loading = true;
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $firebaseArray(sessionsService.getSessionsRef()).$loaded().then(function(sessions) {
    $scope.loading = false;
    $scope.sessions = sessions;
    var sessionRef = $scope.sessions.$ref().child($stateParams.sessionId);
    $scope.session = $firebaseObject(sessionRef);
  });

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

