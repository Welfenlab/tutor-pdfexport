_ = require 'lodash'

defaultConfig =
  runTimeout: 1.5*1000 # 1.5 seconds
  debugTimeout: 2*60*1000 # 2minutes
  codeControls:
    template: _.template '<%= html %>'
  dotProcessor:
    baseSVGTemplate: _.template "<svg data-element-id=\"<%= id %>\"><g/></svg>"
    errorTemplate: _.template "<p style='background-color:red'><%= error %></p>"
  testProcessor:
    registerTest: _.noop
    testResult: _.noop
    testsFinished: _.noop
    template: _.template("<h1>Tests</h1><ul data-element-id=\"<%= id %>\"></ul>")

try
  markdownToHtml = require('@tutor/markdown2html')(defaultConfig)
  markdownToHtml('output').render(atob("{{markdown-base64}}"))
catch e
  document.body.innerText = e.stack

setTimeout((-> window.PHANTOM_HTML_TO_PDF_READY = true), 10000)
