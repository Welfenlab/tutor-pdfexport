var toPdf = require('./pdfconverter.js');

module.exports = function(template) {
  return toPdf.bind(undefined, template);
};
