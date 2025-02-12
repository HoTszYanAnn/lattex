const _ = require("lodash");
const { pipeResolvers, combineResolvers } = require("graphql-resolvers");
const { authenticated } = require("../utils");
const {
  getDocuments,
  getDocument,
  addDocument,
  uploadImage,
} = require("./lattex-impl");
const {
  postprocessDocumentsData,
  postprocessDocumentData
} = require("./postprocessor")
const {
  parseLaTeXCodeToObject,
  parseObjectToLatexCode,
} = require("./parse-lattex")
const { 
  executeGitGraphql, 
  executeGitPutRepo,
  executeGitPutImage,
  executeGitDeleteRepo,
  executeCopyTemplateGraphql,
} = require("../executeQuery");

exports.Document = {
  latex: parseLaTeXCodeToObject,
  updateLaTeX: pipeResolvers(
    parseObjectToLatexCode,
    executeGitPutRepo,
    getDocument,
    executeGitGraphql,
    (parent) => ({
      ...parent,
      data: parent.rawData.viewer.repository
    }),
    postprocessDocumentData,
  ),
}

exports.Query = {
  documents: pipeResolvers(
    getDocuments,
    executeGitGraphql,
    postprocessDocumentsData,
  ),
  document: pipeResolvers(
    getDocument,
    executeGitGraphql,
    (parent) => ({
      ...parent,
      data: parent.rawData.viewer.repository
    }),
    postprocessDocumentData,
  ),
}

exports.Mutation = {
  document: pipeResolvers(
    getDocument,
    executeGitGraphql,
    (parent) => ({
      ...parent,
      data: parent.rawData.viewer.repository
    }),
    postprocessDocumentData,
  ),
  addDocument: pipeResolvers(
    addDocument,
    executeGitGraphql,
    (parent) => ({
      ...parent,
      data: parent.rawData.createRepository.repository
    }),
    executeCopyTemplateGraphql,
    postprocessDocumentData,
  ),
  deleteDocument: pipeResolvers(
    executeGitDeleteRepo,
    getDocuments,
    executeGitGraphql,
    postprocessDocumentsData,
  ),
  uploadImage: pipeResolvers(
    uploadImage,
    executeGitPutImage,
  )
}