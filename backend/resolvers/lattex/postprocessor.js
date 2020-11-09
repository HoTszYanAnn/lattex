const _ = require("lodash");

exports.postprocessDocumentsData = (parent, input, context, info) => {
  const { rawData } = parent
  const datas = rawData.viewer.repositories.nodes
  const result = _(datas)
    .map((data) => postprocessData(data))
    .omitBy(_.isNull)
    .omitBy(_.isUndefined)
    .toArray()
    .value()
  console.log(result)
  return result
}

exports.postprocessDocumentData = (parent, input, context, info) => {
  const { data } = parent
  const result = postprocessData(data)
  if (!result) throw Error('not made by lattex or undefined')
  return result
}

const postprocessData = (data) => {
  //filter out repo not made by lattex
  if (!data || !data.description || !data.description.includes('(made by lattex)')) return null
  
  if (!data.object) return data
  //images data.object.entries[0]
  const repo_obj = _.mapValues(_.keyBy(data.object.entries, 'name'), 'object')
  
  const image = _.mapValues(_.keyBy(repo_obj.images.entries, 'name'), 'object')
  const latex_code = repo_obj['main.tex'].text
  
  return {
    ...data,
    latex_code,
    image,
  }
}