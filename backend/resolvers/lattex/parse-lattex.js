const _ = require("lodash")

exports.parseLaTeXCodeToObject = (parent, input, context, info) => {
  const { latex_code, image } = parent
  const textArray = latex_code.split(/\s*(\n)\s*/).filter(item => !['\n', ''].includes(item))
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
      contentArrayObject.push({
        code: content[i],
      })
    } else {
      contentArrayObject[contentArrayObject.length - 1].text = content[i]
    }
  }

  return {
    ...settingObject,
    images: imageObject,
    contents: contentArrayObject
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
  updatedObject.contents.map((item) => {
    if (item.name) {
      parseText = parseText + `${item.code}\n`
    }
    parseText = parseText + `${item.text}\n`
  })

  //end
  parseText = parseText + '\\end{document}\n'

  return {
    ...parent,
    parseText,
  }
}