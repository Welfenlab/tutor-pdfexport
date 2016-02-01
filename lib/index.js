var toPdf = require('./pdfconverter.js');

var options = {
  shouldInlineExtJs: function(src) {
    return !/https?:/.test(src);
  },
  shouldInlineExtCss: function(src) {
    return false;
  }
};

module.exports = function(templateFile) {
  var path = require('path');
  var template = require('fs').readFileSync(templateFile, "utf-8");
  var templateDir = path.resolve(path.dirname(templateFile));
  template = template.replace(/{dir}/g, templateDir);
  return toPdf.bind(undefined, template);
};
