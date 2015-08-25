var mjAPI = require("MathJax-node");
var fs = require('fs');
var jsdom = require('jsdom').jsdom;

argv.format = argv.format.split(/ *, */);
if (argv.font === "STIX") argv.font = "STIX-Web";
mjAPI.config({MathJax: {SVG: {font: argv.font}}, extensions: argv.extensions});
mjAPI.start();

module.exports = processHTML(html, callback) {
  var document = jsdom(html,{features:{FetchExternalResources: false}});
  var xmlns = getXMLNS(document);
  mjAPI.typeset({
    html: document.body.innerHTML,
    renderer: "SVG",
    inputs: ['TeX'],
    equationNumbers: "none",
    singleDollars: false,
    useFontCache: true,
    useGlobalCache: true,
    addPreview: false,
    speakText: false,
    speakRuleset: "mathspeak",
    speakStyle: "default",
    ex: 6,
    width: 100,
    linebreaks: false
  }, function (result) {
    document.body.innerHTML = result.html;
    document.head.appendChild(document.body.firstChild);
    if (argv.img !== "") {
      var img = document.getElementsByClassName("MathJax_SVG_IMG");
      for (var i = 0, m = img.length; i < m; i++) {
        var N = (i+1).toString(); while (N.length < 4) {N = "0"+N}
        var file = argv.img+N+".svg";
        var svg = [
          '<?xml version="1.0" standalone="no"?>',
          '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
          new Buffer(img[i].src.replace(/^.*?,/,""),"base64").toString("utf-8")
        ].join("\n");
        fs.writeFileSync(file,svg);
        img[i].src = file;
      }
    }
    var HTML = "<!DOCTYPE html>\n"+document.documentElement.outerHTML.replace(/^(\n|\s)*/,"");
    callback(HTML);
  });
};
