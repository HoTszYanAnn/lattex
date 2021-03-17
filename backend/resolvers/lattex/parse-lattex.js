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

  var parseTableToHTML = (key) => {
    console.log("!!!!!!table to html!!!!!!")
    const tmp = key.split(';')
    rows = tmp[1].split('\r\n').filter(row => ![''].includes(row))
    let html = tmp[0]
    rows.map(row => {
        row.split(/&|\\\\\\/).map(ele => {
          console.log(ele)
          if (ele.includes("line")) {
            html = html+'</tr><tr>'
          } else {
            const e = ele.split(/{|}/)
            if (e.length==13&&e[10]!='') {
              html = html+'<td colspan="'+e[1]+'" rowspan="'+e[6]+'"><div>'+e[10]+'<br></div></td>'
            }
            if (e.length==7&&e[5]!='') {
              if (e[0].includes('col')) html = html+'<td colspan="'+e[1]+'" rowspan="1"><div>'+e[5]+'<br></div></td>'
              else html = html+'<td colspan="1" rowspan="'+e[1]+'"><div>'+e[5]+'<br></div></td>'
            }
            if (e.length==1) {
              html = html+'<td><div>'+e[0]+'<br></div></td>'
            }
          }
        })
    })
    console.log(html)
    html = html.substring(0,html.length-4)+tmp[2]
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
      let temp = '<table><tbody><tr>;'
      i = i + 1
      while (content[i] !== '\\end{table}') {
        if (content[i].startsWith('\\begin{tabular}')) {
        } else if (content[i].startsWith('\\end{tabular}')) {
          temp = temp+';</tbody></table>'
        } else if (content[i].startsWith('\\caption')) {
          if (i-j== 1) temp = '<p>'+content[i].substring(9, content[i].length-1)+'<br></p>' + temp
          else temp = temp + '<p>'+content[i].substring(9, content[i].length-1)+'</p>'
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

  var parseHTMLToTable = (html) => {
    console.log("!!!!!!html to table!!!!!!")
    console.log(html)
    rows = html.split(/<tr>|<\/tr>/).filter(row => ![''].includes(row))
    nr = rows.length - 2
    let table = "\\begin{table}\r\n"
    if (rows[0].includes("<p>")) {
      const caption = rows[0].split(/<p>|<br>/)
      table = table + "\\caption{"+caption[1]+"}\r\n"
    } 
    console.log(rows[1])
    let nc = rows[1].split(/<\/td>/).length-1
    const temp = rows[1].split(/"/)
    for (var k=1; k<temp.length; k=k+4) {
      nc = nc-1+parseInt(temp[k])
    }
    let tc ="|"
    for (var k=0; k<nc; k++) {
      tc = "|l"+tc
    }
    table = table + "\\begin{tabular}{"+tc+"}\\hline\r\n"
    //var arr = Array.from(Array(nr),() => new Array(nc))

    table = table + "\\end{tabular}\r\n"
    if (rows[nr+1].includes("<p>")&&(!rows[nr+1].includes("<br>"))) {
      const caption = rows[nr+1].split(/<p>|<\/p>/)
      table = table+ "\\caption{"+caption[1]+"}\r\n"
    }
    table = table + "\\end{table}\r\n"
    console.log(table)
    const tmp = "\\begin{table}\r\n\\caption{top}\r\n\\begin{tabular}{|l|l|l|l|}\\hline\r\n"+ 
    "\\multicolumn{2}{|l|}{\\multirow{2}{*}{z}}&&\\\\\\cline{3-3}\\cline{4-4}\r\n"+
    "\\multicolumn{2}{|l|}{}&\\multicolumn{2}{|l|}{d}\\\\\\hline\r\n"+
    "&&\\multirow{2}{*}{c}&\\\\\\cline{1-2}\\cline{4-4}\r\n"+ 
    "\\multicolumn{2}{|l|}{b}&\\multirow{2}{*}{}&\\\\\\hline\r\n"+
    "\\end{tabular}\r\n\\caption{bottom}\r\n\\end{table}\r\n"
    return tmp;
  }
  //setting
  parseText = parseText + `\\documentclass{${updatedObject.documentclass}}\n`
  parseText = parseText + '\\providecommand{\\tightlist}{\n\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}\n'
  if (updatedObject.documentclass == "beamer") parseText = parseText + '\\usetheme{Madrid}\n'
  parseText = parseText + `\\usepackage{multirow}\n`
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
      } else if (code === 'table') {
        parseText = parseText + parseHTMLToTable(updatedObject.contents[i].text) + '\n'
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
      console.log(temp)
      const res = (await pandoc(temp, args))
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