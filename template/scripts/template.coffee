_ = require 'lodash'
$ = require 'jquery'
scribble = require('scribble.js')($)
SvgCanvas = require 'canvas2svg'

window.renderMarkdown = (markdownBase64) ->
  defaultConfig =
    runTimeout: 1.5*1000 # 1.5 seconds
    debugTimeout: 2*60*1000 # 2minutes
    codeControls:
      template: _.template '<%= html %>'
    dotProcessor:
      baseSVGTemplate: _.template "<svg data-element-id=\"<%= id %>\"><g/></svg>"
      errorTemplate: _.template "<p style='background-color:red'><%= error %></p>"
    testProcessor: false
    treeProcessor: false

  try
    markdownToHtml = require('@tutor/markdown2html')(defaultConfig)
    markdownToHtml('output').render(atob(markdownBase64))
  catch e
    document.body.innerText = e.stack

  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  MathJax.Hub.Queue -> window.PHANTOM_HTML_TO_PDF_READY = true

window.renderCorrection = (correctionBase64) ->
  corrections = JSON.parse(atob(correctionBase64))

  for shapes,i in corrections
    canvas = $('<canvas class="highlighter"></canvas>')
    canvas.prependTo('body')
    canvas[0].width = window.innerWidth
    canvas[0].height = window.innerHeight
    scribble = canvas.scribble().scribble()
    scribble.loadShapes(shapes.filter((s) -> s.tool == 'highlighter'))
    ctx = new SvgCanvas()
    scribble.drawOn ctx
    svg = $(ctx.getSvg())
    svg.prependTo('body').css(
      'top': (i * 29.7) + 'cm' # A4 = 29.7 cm, but there's some offset
    ).addClass('correction highlighter')
    canvas.remove()

    canvas = $('<canvas></canvas>')
    canvas.prependTo('body')
    canvas[0].width = window.innerWidth
    canvas[0].height = window.innerHeight
    scribble = canvas.scribble().scribble()
    scribble.loadShapes(shapes.filter((s) -> s.tool != 'highlighter'))
    ctx = new SvgCanvas()
    scribble.drawOn ctx
    svg = $(ctx.getSvg())
    svg.prependTo('body').css(
      'top': (i * 29.7) + 'cm' # A4 = 29.7 cm, but there's some offset
    ).addClass('correction')
    canvas.remove()
