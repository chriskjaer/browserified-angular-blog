'use strict';

var markdown = require('markdown').markdown;

module.exports = function ($sce) {
  return function (input) {
    var html = markdown.toHTML(input || '', 'Maruku');
    return $sce.trustAsHtml(html);
  };
};