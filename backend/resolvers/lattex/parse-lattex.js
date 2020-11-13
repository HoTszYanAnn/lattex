const _ = require("lodash")

exports.parseLaTeXCodeToObject = (parent, input, context, info) => {
  const { latex_code, image } = parent
  const textArray = latex_code.split(/\s*(\n)\s*/).filter(item => item !== '\n')
  const beginIndex = textArray.findIndex(item => item.includes('\\begin{document}'))
  const makeTitleIndex = textArray.findIndex(item => item.includes('\\maketitle'))
  const tableOfContentIndex = textArray.findIndex(item => item.includes('\\tableofcontents'))

  const setting = textArray.slice(0, beginIndex).concat(textArray[makeTitleIndex], textArray[tableOfContentIndex])
  const content = textArray.slice(beginIndex, makeTitleIndex).concat(textArray.slice(makeTitleIndex + 1, tableOfContentIndex), textArray.slice(tableOfContentIndex + 1));

  const titlesList = ['title', 'author', 'date']

  let settingObject = setting
    .map(item => {
      return item.substring(1).split(/{|}/, 2)
    })
    .reduce((acc, val) => {
      const [key, value] = val;
      if (titlesList.includes(key)) {
        if (key === 'date') {
          if (value === '\\today') {
            acc.titles['always_today'] = true
          } else {
            acc.titles['always_today'] = false
            acc.titles[key] = value;
          }
        } else {
          if (!acc.titles) {
            acc.titles = {}
          }
          acc.titles[key] = value;
        }
      } else if (key.includes('maketitle')) {
        acc.haveTitle = key.includes('\\') ? false : true
      } else if (key.includes('tableofcontents')) {
        acc.haveContentPage = key.includes('\\') ? false : true
      } else {
        acc[key] = value;
      }
      return acc;
    }, {})

  const imageObject =
    _(image)
      .mapValues((value, name) => _.merge({}, value, { name }))
      .values()
      .value()
  console.log(content)
  let contentArrayObject = []
  for (let i = 1; i < content.length - 1; i++) {
    if (content[i].startsWith('\\')) {
      if (content[i].startsWith('\\section')) {
        contentArrayObject.push({
          name: content[i].substring(1).split(/{|}/, 2)[1],
        })
      } else if (content[i].startsWith('\\subsection')) {
        //subsection
        if (!contentArrayObject[contentArrayObject.length - 1].section)
          contentArrayObject[contentArrayObject.length - 1].section = []
        contentArrayObject[contentArrayObject.length - 1].section.push({
          name: content[i].substring(1).split(/{|}/, 2)[1],
          content: content[i + 1]
        })
        i = i + 1
      } else if (content[i].startsWith('\\newpage')) {
        contentArrayObject.push({
          content: content[i]
        })
      }
    } else {
      contentArrayObject[contentArrayObject.length - 1].content = content[i]
    }
  }

  return {
    ...settingObject,
    image: imageObject,
    content: contentArrayObject
  }
}

exports.parseObjectToLatexCode = (parent, { input }, context, info) => {
  const oldObject = this.parseLaTeXCodeToObject(parent)
  const updatedObject = { ...oldObject, ...input }

  let parseText = ""
  //setting
  parseText = parseText + `\\documentclass{${updatedObject.documentclass}}\n`

  parseText = parseText + `\\title{${updatedObject.titles.title}}\n`
  parseText = parseText + `\\author{${updatedObject.titles.author}}\n`
  parseText = parseText + `\\date{${updatedObject.titles.always_today ? '\\today' : updatedObject.titles.date}}\n`

  //begin
  parseText = parseText + '\\begin{document}\n'
  //title
  parseText = parseText + `${!updatedObject.haveTitle ? '%' : ''}\\maketitle\n`
  //contentpage
  parseText = parseText + `${!updatedObject.haveContentPage ? '%' : ''}\\tableofcontents\n`

  //content
  updatedObject.content.map((item) => {
    if (item.name) {
      parseText = parseText + `\\section{${item.name}}\n`
    }
    parseText = parseText + `${item.content}\n`
    if (item.section && item.section.length > 0) {
      item.section.map((subItem) => {
        if (subItem.name) {
          parseText = parseText + `\\subsection{${subItem.name}}\n`
        }
        parseText = parseText + `${subItem.content}\n`
        if (subItem.section && subItem.section.length > 0) {
          item.section.map((subsubItem) => {
            if (subsubItem.name) {
              parseText = parseText + `\\subsubsection{${subsubItem.name}}\n`
            }
            parseText = parseText + `${subsubItem.content}\n`
          })
        }
      })
    }
  })

  //end
  parseText = parseText + '\\end{document}\n'

  return {
    ...parent,
    parseText,
  }
}