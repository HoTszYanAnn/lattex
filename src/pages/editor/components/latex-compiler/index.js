import React from 'react'
import Frame from 'react-frame-component';
import 'latex.js/dist/css/article.css'
import 'latex.js/dist/css/base.css'
import 'latex.js/dist/css/book.css'
import 'latex.js/dist/css/katex.css'

const { parse, HtmlGenerator } = require('latex.js')


const abc = () => {

  let latex = "Hi, this is a line of text. aaaaaa \\[ x^n + y^n = z^n \\]"

  let generator = new HtmlGenerator({ hyphenate: false })

  let doc = parse(latex, { generator: generator }).htmlDocument()
  
  return (
    <>
      <iframe
        srcDoc={'<!DOCTYPE html>' + doc.documentElement.outerHTML}
      />
    </>
  )
}

export default abc