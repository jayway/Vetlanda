'use strict';

app.factory('sessionsService', function ($firebaseArray) {
  var _sessionTypes = [{
    abbr: 'webinar',
    name: 'Webinar'
  }, {
    abbr: 'panels',
    name: 'Panels'
  }, {
    abbr: 'round_tables',
    name: 'Round Tables'
  }, {
    abbr: 'qoas',
    name: 'Q&A\'s'
  }, {
    abbr: 'others',
    name: 'Others'
  }];

  var _getSessions = function () {
    return $firebaseArray(firebase.database().ref().child('sessions'));
  };

  // Public API here
  return {
    getSessionTypes: function () {
      return _sessionTypes
    },
    getSessionsRef: function () {
      return firebase.database().ref().child('sessions');
    },
    getSessions: function () {
      return _getSessions();
    },
    updateSessions: function (sessions) {
      _.each(sessions, function (sessions) {
        events.$save(sessions);
      });
    }
  };
});
