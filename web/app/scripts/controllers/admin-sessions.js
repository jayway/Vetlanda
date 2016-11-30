'use strict';

app.controller('AdminSessionsCtrl', function ($scope, $firebaseArray, $firebaseObject, $state, $mdDialog, sessionsService) {
  $scope.loading = true;
  $scope.sessionTypes = sessionsService.getSessionTypes();
  $scope.sessions = sessionsService.getSessions();

  $firebaseArray(sessionsService.getSessionsRef()).$loaded().then(function (sessions) {
    $scope.loading = false;
  });

  $scope.removeSession = function (session) {
    $scope.sessions.$remove(session);
  };

  $scope.showDeleteConfirm = function(ev, session) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Delete ' + event.title + '? Are you sure?')
      .textContent('All connected sessions and their votes will be lost!')
      .ariaLabel('Delete this event.')
      .targetEvent(ev)
      .ok('Yes, go ahead!')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function(ev) {
      $scope.removeSession(session);
    }, function() {});
  };

  $scope.openAddDialog = function () {
    $scope.showHints = true;
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      templateUrl: 'views/admin-add-session.dialog.html',
      parent: angular.element(document.body),
      controller: function DialogController($scope, $mdDialog) {
        $scope.closeDialog = function () {
          $mdDialog.hide();
        };

        $scope.addSession = function (session) {
          var clonedSession = _.clone(session);
          if (clonedSession.startDate) {
            clonedSession.startDate = session.startDate.getTime();
          }
          if (clonedSession.endDate) {
            clonedSession.endDate = session.endDate.getTime();
          }
          clonedSession.createdAt = new Date().getTime();
          clonedSession.modifiedAt = new Date().getTime();
          addYammerSession(clonedSession);
          //$scope.closeDialog();
        };

      }
    });
  };

  $scope.openEditDialog = function (session) {
    $scope.session = session;
    $scope.session.startDate = new Date(session.startDate);
    $scope.session.endDate = new Date(session.startDate);
    $scope.showHints = true;
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      preserveScope: true,
      templateUrl: 'views/admin-edit-session.dialog.html',
      parent: angular.element(document.body),
      controller: function DialogController($scope, $mdDialog) {
        $scope.closeDialog = function () {
          $mdDialog.hide();
        };

        $scope.editSession = function (session) {
          var clonedSession = _.clone(session);
          if (clonedSession.startDate) {
            clonedSession.startDate = session.startDate.getTime();
          }
          if (clonedSession.endDate) {
            clonedSession.endDate = session.endDate.getTime();
          }
          clonedSession.modifiedAt = new Date().getTime();
          updateYammerSession(clonedSession);
        };

      }
    });
  };

  var addYammerSession = function (session) {
    yam.platform.request({
      url: "groups.json?name=" + session.title + "&private=true",
      method: "POST",
      data: {},
      success: function (group) {
        session.yammerGroupId = group.id;
        session.yammerFeedId = group.feedId;
        console.dir(group);
        console.dir(session);
        $scope.sessions.$add(session);
      },
      error: function (group) {
        console.error("There was an error with the request.");
      }
    });
  };

  var updateYammerSession = function (session) {
    yam.platform.request({
      url: "groups.json?name=" + session.title + "&private=true",
      method: "PUT",
      data: {},
      success: function (group) {
        session.yammerGroupId = group.id;
        session.yammerFeedId = group.feedId;
        console.dir(group);
        console.dir(session);
        $scope.sessions.$save(session);
      },
      error: function (group) {
        console.error("There was an error with the request.");
      }
    });
  };

});
