'use strict';

app.controller('SessionsCtrl', function ($scope, $timeout, $http, sessionsService, localStorageService) {
  $scope.loading = true;
  sessionsService.getSessions().$loaded().then(function (sessions) {
    $scope.sessions = sessions;
    loadConversationData();
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

  var loadConversationData = function () {
    _.each($scope.sessions, function (session, index) {
      $http.get('https://api.yammer.com/api/v1/messages/in_group/' + session.yammerGroupId + '.json',
        {headers: {'Authorization': 'Bearer ' + localStorageService.get("yammer_access_token")}}).
        success(function (response) {
          $scope.sessions[index].groupConversationCount = response.messages.length;
          var participants = _.where(response.references, {type: 'user'});
          $scope.sessions[index].participantsCount = participants.length;
        });
    });
  };
});
