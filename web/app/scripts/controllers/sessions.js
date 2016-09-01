'use strict';

app.controller('SessionsCtrl', function ($scope, sessionsService) {
  $scope.loading = true;
  sessionsService.getSessions().$loaded().then(function (sessions) {
    $scope.sessions = sessions;
    $scope.loading = false;
  });
  $scope.showHints = true;

  var tabs = [
      {title: 'Webinar', type: 'Webinar'},
      {title: 'Panels', type: 'Panel'},
      {title: 'Round Tables', type: 'Round Tables'},
      {title: 'Q&A\'s', type: 'Q&A\s'},
      {title: 'Others', type: 'Others'},
      {title: 'All content', type: ''}
    ];
  $scope.tabs = tabs;
  $scope.selectedIndex = 5;

});
