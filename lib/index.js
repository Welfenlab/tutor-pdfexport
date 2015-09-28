var Inliner = require('inliner');
var toPdf = require('./pdfconverter.js');

var options = {
  shouldInlineExtJs: function(src) {
    return src.indexOf('mathjax') < 0;
  }
};

module.exports = function(templateFile, callback, tmpHtmlPath) {
  new Inliner(templateFile, options, function(err, html) {
    if(tmpHtmlPath){
      require('fs').writeFileSync(tmpHtmlPath, html);
    }
    callback(toPdf.bind(undefined, html));
  });
};
