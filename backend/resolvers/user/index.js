const _ = require("lodash");
const { pipeResolvers, combineResolvers } = require("graphql-resolvers");
const { authenticated } = require("../utils");
const { getSelfInfo, getAuthToken } = require("./user-impl");
const { executeGitGraphql } = require("../executeGitGraphql");

exports.Query = {
  me: pipeResolvers(
    getSelfInfo,
    executeGitGraphql,
    ({ rawData }) => ({
      avatarUrl: rawData.viewer.avatarUrl,
      name: rawData.viewer.login,
    })
  ),
}

exports.Mutation = {
  authenticate: getAuthToken,
}