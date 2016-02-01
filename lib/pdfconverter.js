var Promise = require("bluebird");
var osTmpdir = require('os-tmpdir');

var conversion = require("phantom-html-to-pdf")({
    /* number of allocated phantomjs processes */
    numberOfWorkers: 2,
    /* timeout in ms for html conversion, when the timeout is reached, the phantom process is recycled */
    timeout: 15000,
    /* directory where are stored temporary html and pdf files, use something like npm package reaper to clean this up */
    tmpDir: osTmpdir(),
    /* optional port range where to start phantomjs server */
    portLeftBoundary: 1000,
    portRightBoundary: 2000,
    /* optional hostname where to start phantomjs server */
    host: '127.0.0.1',
    /* use rather dedicated process for every phantom printing
      dedicated-process strategy is quite slower but can solve some bugs
      with corporate proxy */
    strategy: "dedicated-process",
    phantomPath: require('phantomjs-prebuilt').path
});

var btoa = require('btoa');

var toPdf = function(template, markdown, correction) {
  var html = template
                .replace(/{{markdown-base64}}/gi, btoa(markdown))
                .replace(/{{correction-base64}}/gi, btoa(JSON.stringify(correction)));
  //require('fs').writeFileSync("./template-instance.html", html); //useful for debugging
  return new Promise(function(resolve, reject) {
    conversion({
        html: html,
        header: "",
        footer: "",
        printDelay: 0,//time in ms to wait before printing into pdf
        waitForJS: true,
        waitForJSVarName: 'PHANTOM_HTML_TO_PDF_READY',
        allowLocalFilesAccess: true,//set to true to allow request starting with file:///
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            headerHeight: '0cm',
            footerHeight: '0cm',
            margin: '0cm'
        },
        customHeaders: [],
        settings: {
            javascriptEnabled : true
        },
        viewportSize: {
            width: 800,
            height: 600
        },
        format: {
            quality: 100
        }
    }, function(err, pdf) {
      if (!err) {
        resolve(pdf);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = toPdf;
