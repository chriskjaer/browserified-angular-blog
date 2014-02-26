'use strict';

require('angular-route');

var angular = require('angular'),
    routes = require('./routes-main'),
    controller = require('./controller-main'),
    markdownFilter = require('./filter-markdown');

angular.module('app', ['ngRoute'])
  .config(routes)
  .controller('MainCtrl', controller)
  .filter('markdown', markdownFilter);