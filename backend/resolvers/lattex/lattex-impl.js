const _ = require('lodash')

exports.getDocuments = async (parent, input, { gitUser }, info) => ({
  ...parent,
  query: `
    query { 
      viewer { 
        repositories(first : 100){
          nodes{
            createdAt
            description
            url
            id
            isPrivate
            name
            pushedAt
          }
        }
      }
    }
  `
})

exports.getDocument = (parent, input, context, info) => ({
  ...parent,
  query: `
    query { 
      viewer { 
        repository(name : "${input ? input.name ? input.name : parent.name : parent.name}"){
          createdAt
          description
          url
          id
          isPrivate
          name
          pushedAt
          ... on Repository {
            object(expression: "master:") {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Tree {
                      entries {
                        name
                        type
                        object {
                          ... on Blob {
                            byteSize
                            oid
                          }
                        }
                      }
                    }
                    ... on Blob {
                      byteSize
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
})

exports.addDocument = (parent, { input }, context, info) => ({
  ...parent,
  query: `
    mutation{
      createRepository(
        input	:	{
          name: "${input.name}"
          visibility: ${input.visibility}
          description: "${input.description}(made by lattex)"  
        }
      ){
        repository{
          createdAt
          description
          url
          id
          isPrivate
          name
          pushedAt
        }
      }
    }
  `
})

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