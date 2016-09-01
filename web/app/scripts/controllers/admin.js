'use strict';

app.controller('AdminCtrl', function ($scope, $state) {
  $state.transitionTo('/admin.settings');
});
