var converter = require('./index.js');
var fs = require('fs');

converter('./template/template.html', function(convert) {
  console.log("Ready.");

  var markdown = fs.readFileSync('./example.md', 'utf8').toString();
  convert(markdown, function(err, pdf) {
    console.log(err);
    if (!err) {
      var ws = fs.createWriteStream('./example.pdf');
      pdf.stream.pipe(ws);
    }
  });
});
