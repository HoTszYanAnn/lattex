const _ = require("lodash")
const pandoc = require('node-pandoc-promise');
const { v4: uuidv4 } = require('uuid');
const { htmlcode } = require("../../../src/pages/editor/dict");

exports.parseLaTeXCodeToObject = async (parent, input, context, info, skip) => {
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

  if (!skip) {
    imageObject.map((item, index) => {
      item.url = `https://github.com/${context.username}/${input ? input.name ? input.name : parent.name : parent.name}/blob/master/images/${item.name}?raw=true`
    })
  }

  parseTableToHTML = (key) => {
    console.log("!!!!!!table to html!!!!!!")
    const tmp = key.split(';')
    //var arr = Array.from(Array(tmp[0]), () => new Array(tmp[1]));
    //arr[0][0] = 'foo';
    //console.info(arr);
    tmp[2].split('&','\\\\')
    console.log(tmp[2])
    console.log(tmp[3])
    return html;
  }

  //const args = '-f latex -t html'
  const args = ['-f', 'latex', '-t', 'html']

  let parseContentArray = []
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{' || content[i].startsWith('\\begin{figure}')) {
      let temp = content[i]
      i = i + 1
      while (content[i] !== '}' && content[i] !== '\\end{figure}') {
        temp = temp + content[i] + '\r\n'
        i = i + 1
      }
      temp = temp + content[i]
      parseContentArray.push(temp)
    } else if (content[i].startsWith('\\begin{table}')) {
      const j = i
      let row = 0
      let bt = 0
      let col = 0
      let temp = '<table><tbody><tr>;'
      i = i + 1
      while (content[i] !== '\\end{table}') {
        if (content[i].startsWith('\\begin{tabular}')) {
          col = (content[i].lastIndexOf('|') - 16)/2
          bt = i
        } else if (content[i].startsWith('\\end{tabular}')) {
          row = i-bt-1
          temp = row+";"+col+";"+temp+';</tbody></table>'
        } else if (content[i].startsWith('\\caption')) {
          const tmp = '<p>'+content[i].substring(9, content[i].length-1)+'</p>'
          if (i-j== 1) temp = tmp + temp
          else temp = temp + tmp
        } else {
          temp = temp + content[i] + '\r\n'
        }
        i = i + 1
      }
      parseContentArray.push(temp)
    } else {
      parseContentArray.push(content[i])
    }
  }

  let contentArrayObject = await parseContentArray
    .map(item => {
      return (item.startsWith('{') 
      ? [item, null] 
      : item.endsWith('}') 
        ? item.startsWith('\\begin{figure}')
          ? [item, null] 
          : item.split(/{|}/) 
        : [item, null]).filter(item => ![''].includes(item))
    })
    .reduce(async (acc, val) => {
      let newacc = await acc
      const [key, value, extra] = val
      console.log("k: " + key)
      console.log("v: " + value)
      console.log("e: " + extra)
      if (key.startsWith('\\')) {
        if (key.startsWith('\\begin{figure}')) {
          newacc.push({
            id: uuidv4(),
            code: 'figure',
            text: key,
          })
        }  else if (extra != null) {
          newacc.push({
            id: uuidv4(),
            code: key.substring(1, key.length) + "{" + value + "}",
            text: extra,
          })
        } else {
          newacc.push({
            id: uuidv4(),
            code: key.substring(1, key.length),
            text: value,
          })
        }
      } else if (key.includes('<table>')) {
        newacc.push({
          id: uuidv4(),
          code: 'table',
          text: parseTableToHTML(key),
        })
      } else {
        console.log('!!!!!!!!!!! pandoc latex to html !!!!!!!!!!!')
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
  const oldObject = await this.parseLaTeXCodeToObject(parent, { input }, context, info, true)
  const updatedObject = { ...oldObject, ...input }
  let parseText = ""
  console.log(updatedObject)

  //setting
  parseText = parseText + `\\documentclass{${updatedObject.documentclass}}\n`
  parseText = parseText + '\\providecommand{\\tightlist}{\n\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}\n'
  if (updatedObject.documentclass == "beamer") parseText = parseText + '\\usetheme{Madrid}\n'
  parseText = parseText + `\\usepackage{graphicx}\n`
  parseText = parseText + `\\graphicspath{ {./images/} }\n`

  parseText = parseText + `\\title{${updatedObject.titles.title}}\n`
  parseText = parseText + `\\author{${updatedObject.titles.author}}\n`
  parseText = parseText + `\\date{${updatedObject.titles.always_today ? '\\today' : updatedObject.titles.date}}\n`

  //begin
  parseText = parseText + '\\begin{document}\n'

  //content
  const args = ['-f', 'html', '-t', 'latex']
  const tmp = []

  for (let i = 0; i < updatedObject.contents.length; i++) {
    let code = updatedObject.contents[i].code
    if (code) {
      if (code.includes('begin')) {
        tmp.push(code.substring(5, code.length))
        console.log(tmp)
      }
      if (code === 'figure') {
        parseText = parseText + updatedObject.contents[i].text + '\n'
      } else if (code === 'end') {
        parseText = parseText + `\\end${tmp.pop()}\n`
      } else if (updatedObject.contents[i].text) {
        parseText = parseText + `\\${code}{${updatedObject.contents[i].text}}\n\n`
      } else {
        parseText = parseText + `\\${code}\n`
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