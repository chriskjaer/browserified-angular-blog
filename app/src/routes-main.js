'use strict';

var template = require('./view-main');
    
module.exports = function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: template
    })
    .otherwise({
      redirectTo: '/'
    });
};