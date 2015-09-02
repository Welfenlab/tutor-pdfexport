var Inliner = require('inliner');
var toPdf = require('./pdfconverter.js');

var options = {
  shouldInlineExtJs: function(src) {
    return src.indexOf('mathjax') < 0;
  }
};

module.exports = function(templateFile, callback) {
  new Inliner(templateFile, options, function(err, html) {
    require('fs').writeFileSync('../template-instance.html', html);
    callback(toPdf.bind(undefined, html));
  });
};
