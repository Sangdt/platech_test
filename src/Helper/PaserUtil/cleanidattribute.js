var visit = require('unist-util-visit')
var is = require('hast-util-is-element')
var has = require('hast-util-has-property')

module.exports=cleanidattribute;

var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function cleanidattribute() {
    return transformer
  }
  
  function transformer(tree) {  
    visit(tree, 'element', function(node) {
      if (is(node, headings) && has(node, 'id')) {
          //console.log("node.properties",node.properties)
        node.properties.id = node.properties.id.replace(/user-content-/g,'');
      }
    })
  }