'use strict';

var markdown = require('markdown').markdown;

module.exports = function ($scope, $http) {
  var app = this;

  $http({
    url: './posts/hello-world.md',
    method: 'GET'
  })
  .success(function (data) {
    app.content = data;
    var meta = markdown.parse(data, 'Maruku');
    app.meta = meta[1]; // Meta data is in 2. entry.
  });
};