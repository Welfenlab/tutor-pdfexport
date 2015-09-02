_ = require 'lodash'

moreMarkdown = require 'more-markdown'
mathjaxProcessor = require '@more-markdown/mathjax-processor'
dotProcessor     = require '@more-markdown/dot-processor'

proc = moreMarkdown.create 'output', processors: [
  # The mathjax processor finds all LaTeX formulas and typesets them
  mathjaxProcessor,

  # The dot processor processes "dot" environments and creates SVG graphs
  # for these
  dotProcessor("dot", (_.template "<svg data-element-id=\"<%= id %>\"><g/></svg>"),
    _.template "<p style='background-color:red'><%= error %></p>")
]

proc.render atob "{{markdown-base64}}"
###
proc.render """
# Test

$$ a = \frac{1}{b}$$

```js
console.log("eval this!");
```

# Graphs via dot and dagreD3

```dot
digraph {
abc -> b;
c -> b;
}
```


```test
anyGraph("should have b", function(g){
    if(!g._nodes["b"]){
        throw "NO B";
    }
});
it("should work", function(){});
it("should work 2", function(){});
it("should work 3", function(){throw "abc"});
```

"""
###
