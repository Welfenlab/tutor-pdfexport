var Inliner = require('inliner');
var toPdf = require('./pdfconverter.js');

module.exports = function(templateFile, callback) {
  new Inliner(templateFile, function(err, html) {
    callback(toPdf.bind(undefined, html));
  });
};
