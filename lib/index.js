var Inliner = require('inliner');
var toPdf = require('./pdfconverter.js');

var options = {
  shouldInlineExtJs: function(src) {
    return !/https?:/.test(src);
  },
  shouldInlineExtCss: function(src) {
    return false;
  }
};

module.exports = function(templateFile, callback, tmpHtmlPath) {
  new Inliner(templateFile, options, function(err, html) {
    require('fs').writeFileSync('./moep.html', html);
    callback(toPdf.bind(undefined, html));
  });
};
