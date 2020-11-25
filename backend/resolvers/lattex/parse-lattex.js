const _ = require("lodash")
const { uniqueId } = require("lodash")
const pandoc = require('node-pandoc-promise');

exports.parseLaTeXCodeToObject = async (parent, input, context, info) => {
  const { latex_code, image } = parent
  const textArray = latex_code.split(/\s*(\n)\s*/).filter(item => !['\n', ''].includes(item))
  const beginIndex = textArray.findIndex(item => item.includes('\\begin{document}'))
  const endIndex = textArray.findIndex(item => item.includes('\\end{document}'))

  const setting = textArray.slice(0, beginIndex)
  const content = textArray.slice(beginIndex + 1, endIndex);

  const titlesList = ['title', 'author', 'date']

  let settingObject = setting
    .map(item => {
      return item.substring(1).split(/{|}/, 2)
    })
    .reduce((acc, val) => {
      const [key, value] = val;
      if (!acc.titles) {
        acc.titles = {}
        acc.titles['always_today'] = false
      } else if (!acc.titles['always_today']) {
        acc.titles['always_today'] = false
      }
      if (titlesList.includes(key)) {
        if (key === 'date') {
          if (value === '\\today') {
            acc.titles['always_today'] = true
            acc.titles[key] = null
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

  //const args = '-f latex -t html'
  const args = ['-f', 'latex', '-t', 'html']

  let contentArrayObject = await content
    .map(item => {
      return item.startsWith('\\') ? item.split(/{|}/, 2) : [item, null]
    })
    .reduce(async (acc, val) => {
      let newacc = await acc
      const [key, value] = val
      console.log(key)
      console.log(value)
      if (key.startsWith('\\')) {
        newacc.push({
          id: uniqueId(),
          code: key.substring(1, key.length),
          text: value,
        })
      } else {
        const res = (await pandoc(key, args)).replace('\n', '')
        newacc.push({
          id: uniqueId(),
          code: null,
          text: res,
        })
      }
      return newacc;
    }, [])
  console.log(contentArrayObject)
  return {
    ...settingObject,
    images: imageObject,
    contents: contentArrayObject,
    latex_code,
  }
}

exports.parseObjectToLatexCode = async (parent, { input }, context, info) => {
  const oldObject = await this.parseLaTeXCodeToObject(parent)
  const updatedObject = { ...oldObject, ...input }
  let parseText = ""

  //setting
  parseText = parseText + `\\documentclass{${updatedObject.documentclass}}\n`

  parseText = parseText + `\\title{${updatedObject.titles.title}}\n`
  parseText = parseText + `\\author{${updatedObject.titles.author}}\n`
  parseText = parseText + `\\date{${updatedObject.titles.always_today ? '\\today' : updatedObject.titles.date}}\n`

  //begin
  parseText = parseText + '\\begin{document}\n'

  //content
  const args = ['-f', 'html', '-t', 'latex']

  for (let i = 0; i < updatedObject.contents.length; i++) {
    if (updatedObject.contents[i].code) {
      if (updatedObject.contents[i].text) {
        parseText = parseText + `\\${updatedObject.contents[i].code}{${updatedObject.contents[i].text}}\n`
      } else {
        parseText = parseText + `\\${updatedObject.contents[i].code}\n`
      }
    } else {
      const res = await pandoc(updatedObject.contents[i].text, args)
      parseText = parseText + `${res}\n`
    }
  }
  //end
  parseText = parseText + '\\end{document}\n'

  return {
    ...parent,
    parseText,
  }
}