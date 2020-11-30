const _ = require("lodash")
const pandoc = require('node-pandoc-promise');
const { v4: uuidv4 } = require('uuid');

exports.parseLaTeXCodeToObject = async (parent, input, context, info) => {
  const { latex_code, image } = parent
  const textArray = latex_code.split(/\s*(\n)\s*/).filter(item => !['\n', ''].includes(item))
  const titleIndex = textArray.findIndex(item => item.includes('\\title'))
  const beginIndex = textArray.findIndex(item => item.includes('\\begin{document}'))
  const endIndex = textArray.findIndex(item => item.includes('\\end{document}'))

  const setting = textArray.slice(titleIndex, beginIndex)
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

  settingObject.documentclass = textArray.find(item => item.includes('\\documentclass')).substring(1).split(/{|}/, 2)[1]

  const imageObject =
    _(image)
      .mapValues((value, name) => _.merge({}, value, { name }))
      .values()
      .value()

  //const args = '-f latex -t html'
  const args = ['-f', 'latex', '-t', 'html']

  console.log(content)
  let parseContentArray = []
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') {
      let temp = content[i]
      i = i + 1
      while (content[i] !== '}') {
        temp = temp + content[i] + '\r\n'
        i = i + 1
      }
      temp = temp + content[i]
      parseContentArray.push(temp)
    } else {
      parseContentArray.push(content[i])
    }
  }
  console.log(parseContentArray)

  let contentArrayObject = await parseContentArray
    .map(item => {
      return item.startsWith('{') ? [item, null] : item.split(/{|}/, 2)
    })
    .reduce(async (acc, val) => {
      let newacc = await acc
      const [key, value] = val
      if (key.startsWith('\\')) {
        newacc.push({
          id: uuidv4(),
          code: key.substring(1, key.length),
          text: value,
        })
      } else {
        console.log('pandoc latex to html !!!!!!!!!!!')
        let res = (await pandoc(key.substring(1, key.length - 1), args))
        if (!res.startsWith('<pre><code>')) {
          res = res.split('\r\n').join('').split('\n').join('')
        }
        console.log({ from: key, to: res })
        newacc.push({
          id: uuidv4(),
          code: null,
          text: res,
        })
      }
      return newacc;
    }, [])

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
  parseText = parseText + '\\providecommand{\\tightlist}{\n\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}\n'

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
      console.log('pandoc html - latex!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      const temp = updatedObject.contents[i].text.split('</p><p>').join('<br/>')
      //const temp = updatedObject.contents[i].text
      console.log(temp)
      const res = (await pandoc(temp, args))
      //.split(/}\n\n/).join('}'))
      //.split(/\n\n\\/).join('\\'))
      //.split(/\n\n/).join('\\\\'))
      //.split(/\n/).join('')
      console.log(res)
      console.log({ test: res })
      parseText = parseText + `{\n${res}}\n\n`
    }
  }
  //end
  parseText = parseText + '\\end{document}\n'

  return {
    ...parent,
    parseText,
  }
}