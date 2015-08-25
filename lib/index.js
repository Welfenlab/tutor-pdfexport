var Inliner = require('inliner');
var toPdf = require('./pdfconverter.js');

var options = {
  shouldInlineExtJs: function(src) {
    var x = src.indexOf('mathjax') < 0;
    console.log(x);
    return x;
  }
};

module.exports = function(templateFile, callback) {
  new Inliner(templateFile, options, function(err, html) {
    require('fs').writeFileSync('../template-instance.html', html);
    console.log(html);
    callback(toPdf.bind(undefined, html));
  });
};
