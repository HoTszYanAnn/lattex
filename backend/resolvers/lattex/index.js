const _ = require("lodash");
const { pipeResolvers, combineResolvers } = require("graphql-resolvers");
const { authenticated } = require("../utils");
const {
  getDocuments,
  getDocument,
  addDocument,
} = require("./lattex-impl");
const {
  postprocessDocumentsData,
  postprocessDocumentData
} = require("./postprocessor")
const { executeGitGraphql } = require("../executeGitGraphql");

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
  addDocument: pipeResolvers(
    addDocument,
    executeGitGraphql,
    (parent) => ({
      ...parent,
      data: parent.rawData.createRepository.repository
    }),
    postprocessDocumentData,
  ),
}