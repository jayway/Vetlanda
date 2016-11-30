'use strict';

app.controller('AdminSessionsCtrl', function ($scope, $q, $firebaseArray, $firebaseObject, $state, $mdDialog, sessionsService) {
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
    $scope.session = {};
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
          var clone = _.clone(session);
          if (clone.startDate) {
            clone.startDate = session.startDate.getTime();
          }
          if (clone.endDate) {
            clone.endDate = session.endDate.getTime();
          }
          clone.createdAt = new Date().getTime();
          clone.modifiedAt = new Date().getTime();
          addYammerSession(clone).then(function (group) {
            clone.yammerGroupId = group.id || null;
            clone.yammerFeedId = group.feedId || null;
            $scope.sessions.$add(clone).then(function () {
              $scope.closeDialog();
            }).catch(function(error) {
              console.log('Error when adding session: ' + error);
            });
          });
        };

      }
    });
  };

  var addYammerSession = function (session) {
    var defer = $q.defer();
    yam.platform.request({
      url: "groups.json?name=" + session.title + "&private=true",
      method: "POST",
      data: {},
      success: function (group) {
        defer.resolve(group);
      },
      error: function (error) {
        console.error("There was an error with the request.");
        defer.reject(error);
      }
    });
    return defer.promise;
  };

  $scope.openEditDialog = function (session) {
    $scope.session = session;
    $scope.session.startDate = new Date(session.startDate);
    $scope.session.endDate = new Date(session.endDate);
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
          if (session.startDate) {
            session.startDate = session.startDate.getTime();
          }
          if (session.endDate) {
            session.endDate = session.endDate.getTime();
          }
          session.modifiedAt = new Date().getTime();
          $scope.sessions.$save(session);
          $scope.closeDialog();
        };

      }
    });
  };

});
