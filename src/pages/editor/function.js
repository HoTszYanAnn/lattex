/* temp format
 {
    verified: '%make by LätTeX\n',
    documentType: '\\document{article}\n',
    contentPage: '%\\tableofcontents\n',
    title: '\\title{}\n\\author{}\n',
    begin: '\\begin{document}\n',
    haveTitle: '\\maketitle\n',
    content: [
      'testing\n',
    ],
    end: '\\end{document}\n'
  }
*/
const order = [
  'verified', 
  '\\n',
  'documentType', 
  '\\n',
  'haveContentPage', 
  '\\n',
  'titles',
  '\\n',
  '\\n', 
  'begin', 
  'haveTitle', 
  'content', 
  'end'
]

export const toLatexCode = (packed_code) => {
  return order.reduce((code, key) => {
    if (key === 'content'){
      return code + packed_code[key].join('')
    }else if (key === '\\n') {
      return code + '\n'
    }else{
      return code + packed_code[key]
    }
  }, '')
}